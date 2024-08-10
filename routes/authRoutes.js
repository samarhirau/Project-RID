


// const express = require('express');
// const authController = require('../controllers/authController');

// const router = express.Router();
// const nodemailer = require('nodemailer');



// // Login route
// router.post('/login', authController.loginUser);



// router.get('/logout', (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return res.status(500).send('Logout failed'); // Handle the error
//     }
//     res.clearCookie('auth_cookie'); // Clear the authentication cookie
//     res.redirect('/'); // Redirect to the home page after successful logout
//   });
// });




// // SMTP configuration
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//       user: 'samarhirau.official@gmail.com',
//       pass: 'mpqjpngtfeestrxq'
//   }
// });

// // Route to send reset email
// router.post('/send-reset-email', (req, res) => {
//   const { email } = req.body;

//   const mailOptions = {
//       from: 'samarhirau.official@gmail.com',
//       to: email,
//       subject: 'Password Reset Request',
//       text: 'Click the link below to reset your password: \n\nhttp://yourwebsite.com/reset-password'
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           console.log('SendMail Error:', error);
//           return res.status(500).send('Error sending email');
//       }
//       console.log('Email sent:', info.response);
//       res.status(200).send('Email sent successfully');
//   });
// });





// module.exports = router;


const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Login route
router.post('/login', authController.loginUser);

// Request password reset
router.post('/forgot-password', authController.forgotPassword);

// Verify OTP and reset password
router.post('/reset-password', authController.resetPassword);


// Logout route
// router.get('/logout', (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return res.status(500).send('Logout failed');
//     }
//     res.clearCookie('auth_cookie');
//     res.redirect('/');
//   });
// });


// Serve the reset password page
router.get('/reset-password', (req, res) => {
  const email = req.query.email; // Get the email from query parameters
  res.render('resetPassword', { email }); // Render the reset password page with the email
});


module.exports = router;


