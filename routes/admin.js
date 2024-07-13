// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { addCertificate } = require('../controllers/adminController');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post('/upload', upload.single('certificate'), addCertificate);

// module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addCertificate } = require('../controllers/adminController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('certificate'), addCertificate);

module.exports = router;
