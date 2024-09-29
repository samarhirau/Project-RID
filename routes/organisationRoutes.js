// routes/organisationRoutes.js
const express = require('express');
const router = express.Router();
const organisationController = require('../controllers/organisationController');

// Route to handle organization creation
//router.post('/organisation', organisationController.createOrganisation);
router.post('/organisation', organisationController.createOrganisation);
module.exports = router;