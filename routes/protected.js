// // routes.js
// const express = require('express');
// const router = express.Router();
// const authenticateJWT = require('../middleware/authMiddleware');
// const path = require('path');

// router.get('/student', authenticateJWT, (req, res) => {
//   if (req.user.role === 'student') {
//     res.sendFile(path.join(__dirname, '..', 'public', 'student.html')); 
//   } else {
//     res.status(403).json({ message: 'Access forbidden: Students only' });
//   }
// });

// module.exports = router;



