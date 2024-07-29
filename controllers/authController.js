// const User = require('../models/user');
// const crypto = require('crypto');

// exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email: email });

//         if (!user) {
//             return res.status(404).send('User not found');
//         }

//         const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

//         if (user.password !== hashedPassword) {
//             return res.status(401).send('Invalid password');
//         }
//         req.session.user = user; 
//         res.redirect('/?login=success'); // Redirect to index.html with a success query parameter
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//         console.error("Error:", error);
//     }
// };


// exports.checkSession = (req, res) => {
//     if (req.session.user) {
//         res.json({
//             loggedIn: true,
//             user: req.session.user
//         });
//     } else {
//         res.json({ loggedIn: false });
//     }
// };





// // controllers/authController.js
// module.exports.logout = (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             return res.status(500).send('Failed to logout.');
//         }
//         res.clearCookie('connect.sid', { path: '/' });
//         res.sendStatus(200);
//     });
// };

   





// controllers/authController.js
const User = require('../models/user');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// User login logic
const loginUser = (req, res) => {
  // Implement login logic here
  // This is typically where you'd check user credentials and create a session or JWT token
  res.send('Login logic here');
};

// Handle forgot password request
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password.html?token=${resetToken}`;
    const subject = 'Password Reset Request';
    const message = `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`;

    await sendEmail(email, subject, message);

    res.json({ message: 'Password reset email sent.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending reset email.' });
  }
};

// Handle password reset
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    user.password = password; // Hash password in a real-world scenario
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: 'Password has been reset.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password.' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  const { email, firstname, lastname, phone, dob, gender, course } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { firstname, lastname, phone, dob, gender, course },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User profile updated successfully.', user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile.' });
  }
};

module.exports = {
  loginUser,
  forgotPassword,
  resetPassword,
  updateProfile
};
