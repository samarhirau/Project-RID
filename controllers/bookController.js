const Book = require('../models/ebookModel');

// Controller to handle adding a new book
exports.addBook = async (req, res) => {
    const { title, author, publishYear, rating, description } = req.body;
    const image = req.files.image; // Using `req.files` to access uploaded image

    // Convert image to Base64
    const base64Image = image.data.toString('base64');

    const newBook = new Book({
        title,
        author,
        publishYear,
        rating,
        description,
        image: base64Image
    });

    try {
        await newBook.save();
        // res.redirect('/books');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error uploading book');
    }
};

// Controller to handle fetching all books
// exports.getBooks = async (req, res) => {
//     try {
//         const books = await Book.find({});
//         console.log(books);  // Log to check the data retrieved from MongoDB
//         res.render('books', { moreBooks: books });  // Ensure the key matches the one used in EJS
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error fetching books');
//     }
// };

exports.getEbooks = async (req, res) => {
    try {
        const books = await Book.find({});
        const moreBooks = await Book.find({});
        res.render('ebook', { books, moreBooks });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching books');
    }
};


exports.getBookDetails = async (req, res) => {
    try {
        const bookId = req.params.id; // Get the book ID from the URL
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.render('detail-ebook', { book });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching book details');
    }
};