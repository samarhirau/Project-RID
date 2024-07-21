
// const express = require('express');
// const router = express.Router();
// const { verifyCertificate, getCertificateFile } = require('../controllers/verifyController');

// // Route to handle certificate verification
// router.post('/verify', verifyCertificate);

// // Route to serve certificate files
// router.get('/certificate/:id', getCertificateFile);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { verifyCertificate, getCertificateFile } = require('../controllers/verifyController');

// Route to verify certificate
router.post('/verify', verifyCertificate);

// Route to get certificate file
router.get('/certificate/:id', getCertificateFile);

module.exports = router;




