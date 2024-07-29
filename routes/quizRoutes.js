// routes/quizRoutes.js

const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Define the route to get a question
router.get('/question', quizController.getQuestion);

module.exports = router;
