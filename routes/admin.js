

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { addCertificate } = require('../controllers/adminController');

// const storage = multer.memoryStorage();
// const upload = multer({ storage });



// router.post('/upload', upload.single('certificate'), addCertificate);

// module.exports = router;





const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('certificate'), addCertificate);
router.get('/registrations/count', getRegistrationsCount); // New route for getting registrations count


// Login route
router.post('/login', authenticateAdmin, (req, res) => {
    res.redirect('/admin'); // Redirect to the admin page upon successful login
  });

module.exports = router;







