

const express = require('express');
const router = express.Router();
const { verifyCertificate, getCertificateFile } = require('../controllers/verifyController');

// Route to verify certificate
router.post('/verify', verifyCertificate);

// Route to get certificate file
router.get('/certificate/:id', getCertificateFile);

module.exports = router;




