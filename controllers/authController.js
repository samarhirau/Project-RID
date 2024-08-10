
// const User = require('../models/user');
// const crypto = require('crypto');
// const sendEmail = require('../utils/sendEmail');

// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email: email });

//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

//     if (user.password !== hashedPassword) {
//       return res.status(401).send('Invalid password');
//     }

//     req.session.user = user;
//     res.redirect('/?login=success');
//   } catch (error) {
//     res.status(500).send('Internal Server Error');
//     console.error("Error:", error);
//   }
// };

// exports.checkSession = (req, res) => {
//   if (req.session.user) {
//     res.json({
//       loggedIn: true,
//       user: req.session.user
//     });
//   } else {
//     res.json({ loggedIn: false });
//   }
// };

// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
//     user.resetToken = otp;
//     user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
//     await user.save();

//     const subject = 'Password Reset OTP';
//     const message = `<p>Your OTP for password reset is: <strong>${otp}</strong></p>`;

//     await sendEmail(email, subject, message);

//     res.json({ message: 'OTP sent to your email.' });
//   } catch (error) {
//     console.error('Error sending OTP email:', error);
//     res.status(500).json({ message: 'Error sending OTP email.' });
//   }
// };

// exports.resetPassword = async (req, res) => {
//   const { otp, password } = req.body;

//   try {
//     const user = await User.findOne({
//       resetToken: otp,
//       resetTokenExpiry: { $gt: Date.now() }, // Check if OTP is still valid
//     });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid or expired OTP.' });
//     }

//     user.password = crypto.createHash('sha256').update(password).digest('hex'); // Hash password
//     user.resetToken = undefined;
//     user.resetTokenExpiry = undefined;
//     await user.save();

//     res.json({ message: 'Password has been reset successfully.' });
//   } catch (error) {
//     console.error('Error resetting password:', error);
//     res.status(500).json({ message: 'Error resetting password.' });
//   }
// };


const User = require('../models/user');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { storeOTP, validateOTP } = require('../utils/otpUtils'); 
const { sendEmail } = require('../utils/sendEmail'); // Import the sendEmail utility

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        if (user.password !== hashedPassword) {
            return res.status(401).send('Invalid password');
        }

        req.session.user = user;
        res.redirect('/?login=success');
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Internal Server Error');
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // Example OTP generation
        storeOTP(email, otp); // Store OTP

        // Send OTP via email
        const message = `<p>Your OTP is ${otp}</p>`;
        await sendEmail(email, 'Password Reset OTP', message);

        res.json({ message: 'OTP sent to email' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  // Validate OTP
  if (!validateOTP(email, otp)) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
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
