


// const express = require('express');
// const authController = require('../controllers/authController');

// const router = express.Router();

// // Login route
// router.post('/login', authController.loginUser);

// // Request password reset
// router.post('/forgot-password', authController.forgotPassword);

// // Verify OTP and reset password
// router.post('/reset-password', authController.resetPassword);



// // router.get('/logout', (req, res) => {
// //   req.logout((err) => {
// //     if (err) {
// //       return res.status(500).send('Logout failed');
// //     }
// //     res.clearCookie('auth_cookie');
// //     res.redirect('/');
// //   });
// // });


// // Serve the reset password page
// router.get('/reset-password', (req, res) => {
//   const email = req.query.email; // Get the email from query parameters
//   res.render('resetPassword', { email }); // Render the reset password page with the email
// });




// module.exports = router;

// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.loginUser);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/verify-otp', authController.verifyOTP);
module.exports = router;

