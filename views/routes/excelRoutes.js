// // routes/excelRoutes.js
// const express = require('express');
// const router = express.Router();
// const excelController = require('../controllers/excelController');

// // Define route to get Excel data
// router.get('/data', excelController.getExcelData);

// module.exports = router;


// routes/excelRoutes.js
const express = require('express');
const router = express.Router();
const excelController = require('../controllers/excelController');

// Define route to get student names
router.get('/students', excelController.getStudentNames);

module.exports = router;
