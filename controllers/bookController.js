const Book = require('../models/ebookModel');


// Controller to handle adding a new book
exports.addBook = async (req, res) => {
    const { title, author, publishYear, rating, description } = req.body;
    const image = req.files.image; // Using `req.files` to access uploaded image
    const pdfFile = req.files.pdf; 
    // Convert image to Base64
    const base64Image = image.data.toString('base64');
    const pdfData = pdfFile.data;

    const newBook = new Book({
        title,
        author,
        publishYear,
        rating,
        description,
        image: base64Image,
        pdf: {
            data: pdfData,
            contentType: pdfFile.mimetype   // Store MIME type (e.g., 'application/pdf')
        }
    });

    try {
        await newBook.save();
        // res.redirect('/books');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error uploading book');
    }
};



exports.getEbooks = async (req, res) => {
    try {
       // const shuffledBooks = shuffleArray(books);
        const books = await Book.find({});
        const moreBooks = await Book.find({});
        res.render('ebook', { books, moreBooks });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching books');
    }
};


// exports.getBookDetails = async (req, res) => {
//     try {
//         const bookId = req.params.id; // Get the book ID from the URL
//         const book = await Book.findById(bookId);
//         if (!book) {
//             return res.status(404).send('Book not found');
//         }
//         res.render('detail-ebook', { book });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error fetching book details');
//     }
// };

const getBookById = async (id) => {
    try {
        // Assuming you're using a MongoDB model called Book to fetch the book by ID
        const book = await Book.findById(id);
        return book;
    } catch (error) {
        console.error('Error fetching book:', error);
        return null;
    }
};




exports.getBookDetails = async (req, res) => {
    const bookId = req.params.id; // Retrieve the book ID from the route

    const book = await getBookById(bookId); // Fetch the book

    if (book) {
        res.render('detail-ebook', {
            title: book.title,
            book: book, // Pass the book data to the EJS template
            pdfUrl: `/download-pdf/${book._id}`, // URL for viewing the PDF
            downloadUrl: `/download-pdf/${book._id}` // URL for downloading the PDF
        });
    } else {
        res.render('error', {
            message: 'Book not found',
        });
    }
};
