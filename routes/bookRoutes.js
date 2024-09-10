const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
// const authenticateJWT = require('../middleware/authMiddleware');
// const authorizeRole = require('../middleware/authorizeRole');

// Route to render upload form
// router.get('/ebook-upload',authenticateJWT, authorizeRole('admin'), (req, res) => {
//     res.sendFile('BooksUpload.html', { root: __dirname + '/../public' }); 
// });
router.get('/ebook-upload', (req, res) => {
    res.sendFile('BooksUpload.html', { root: __dirname + '/../public' }); 
});


// Route to handle book upload
router.post('/upload-book', bookController.addBook);

// Route to display all books
router.get('/ebook', bookController.getEbooks);


router.get('/book/:id', bookController.getBookDetails);

module.exports = router;
