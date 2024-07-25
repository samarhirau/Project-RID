// // controllers/excelController.js
// const xlsx = require('xlsx');
// const path = require('path');

// exports.getExcelData = (req, res) => {
//     const workbook = xlsx.readFile(path.join(__dirname, '../your_file.xlsx'));
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const data = xlsx.utils.sheet_to_json(sheet);
//     res.json(data);
// };
// controllers/excelController.js
const xlsx = require('xlsx');
const path = require('path');

exports.getStudentNames = (req, res) => {
    // Read the Excel file
    const workbook = xlsx.readFile(path.join(__dirname, '../your_file.xlsx'));
    
    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Convert sheet to JSON
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    // Extract "Student Name" column into an array
    const studentNames = jsonData.map(row => row['Student Name']); // Adjust column header as needed

    res.json(studentNames);
};
