const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Route to render upload form
router.get('/ebook-upload', (req, res) => {
    res.sendFile('BooksUpload.html', { root: __dirname + '/../public' });  // Corrected 'root' option
});


// Route to handle book upload
router.post('/upload-book', bookController.addBook);

// Route to display all books
router.get('/ebook', bookController.getEbooks);

module.exports = router;
