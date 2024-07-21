

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addCertificate } = require('../controllers/adminController');

const storage = multer.memoryStorage();
const upload = multer({ storage });



router.post('/upload', upload.single('certificate'), addCertificate);

module.exports = router;




