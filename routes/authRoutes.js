// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// router.post('/login', authController.loginUser);
// router.post('/logout', authController.logoutUser);
// router.get('/check-session', authController.checkSession);

// // POST route for user logout
// router.post('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if (err) {
//             return res.status(500).send('Error logging out');
//         }
//         res.clearCookie('connect.sid'); // Clear session cookie
//         res.sendStatus(200); // Send OK response
//     });
// });

// module.exports = router;





const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();



// Login route
router.post('/login', authController.loginUser);



router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Logout failed'); // Handle the error
    }
    res.clearCookie('auth_cookie'); // Clear the authentication cookie
    res.redirect('/'); // Redirect to the home page after successful logout
  });
});


module.exports = router;

