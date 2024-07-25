// controllers/excelController.js
const xlsx = require('xlsx');
const path = require('path');

exports.getExcelData = (req, res) => {
    const workbook = xlsx.readFile(path.join(__dirname, '../your_file.xlsx'));
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    res.json(data);
};
