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



// Route to download the PDF of a specific book
router.get('/download-pdf/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book || !book.pdf) {
            return res.status(404).send('PDF not found');
        }
        res.contentType(book.pdf.contentType); // Set the content type of the response
        res.send(book.pdf.data); // Send the binary data
    } catch (error) {
        console.error('Error downloading PDF:', error);
        res.status(500).send('Server error');
    }
});


module.exports = router;
