

const User = require('../models/user');
const bcrypt = require('bcrypt');
const { storeOTP, validateOTP } = require('../utils/otpUtils');
const { sendEmail } = require('../utils/sendEmail');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send('Invalid password');
        }

        req.session.user = user;
        res.redirect('/?login=success');
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Internal Server Error');
    }
};


exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const isValidOTP = await validateOTP(email, otp);
        if (!isValidOTP) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await storeOTP(email, otp);

        const message = `<p>Your OTP is ${otp}. It will expire in 10 minutes.</p>`;
        await sendEmail(email, 'Password Reset OTP', message);

        res.json({ message: 'OTP sent to email' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: 'Email, OTP, and new password are required' });
    }

    // Validate OTP
    const isValidOTP = validateOTP(email, otp);
    if (!isValidOTP) {
        return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    try {
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        user.password = hashedPassword;
        await user.save();

        // Respond with success
        res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ success: false, message: 'Error resetting password' });
    }
};

