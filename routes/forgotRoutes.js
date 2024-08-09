const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
 const User = require('../models/user'); // Adjust the path as necessary

// SMTP configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'samarhirau.official@gmail.com',
        pass: 'mpqjpngtfeestrxq'
    }
});

// Route to handle sending the password reset email
router.post('/send-reset-email', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        // Create the reset link
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

        // Send the email
        const mailOptions = {
            from: 'samarhirau.official@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            text: `Click the link below to reset your password:\n\n${resetLink}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send('Reset email sent successfully');
    } catch (error) {
        console.error('Error sending reset email:', error);
        res.status(500).send('Error sending reset email');
    }
});

// Route to handle resetting the password
router.post('/reset-password', async (req, res) => {
    const { token } = req.query; // Get the token from query parameters
    const { newPassword } = req.body;

    try {
        // Find the user with the reset token and check if it's still valid
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() } // Token must be valid (not expired)
        });

        if (!user) {
            return res.status(400).send('Invalid or expired token');
        }

        // Update the user's password
        user.password = newPassword; // Hash the password before saving in a real implementation
        user.resetToken = undefined; // Clear the reset token
        user.resetTokenExpiration = undefined; // Clear the token expiration
        await user.save();

        res.status(200).send('Password has been reset successfully');
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).send('Error resetting password');
    }
});

module.exports = router;
