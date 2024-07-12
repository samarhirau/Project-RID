const express = require('express');
const router = express.Router();
const { verifyCertificate } = require('../controllers/verifyController');

// Route to handle certificate verification
router.post('/verify', verifyCertificate);

module.exports = router;
