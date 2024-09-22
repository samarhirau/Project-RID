const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const Book = require("../models/ebookModel")
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

// Route to render flipbook view with dynamic URL
router.get('/flipbook/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }

        // Pass the download URL for the flipbook
        res.render('flipbook', {
            title: `${book.title} Flipbook`,
            pdfUrl: `/download-pdf/${book._id}`, // Use the download route as the URL
            downloadUrl: `/download-pdf/${book._id}` // Dynamic download URL for the book
        });
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).send('Server error');
    }
});


module.exports = router;
