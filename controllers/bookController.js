const Book = require('../models/ebookModel');
const { uploadToCloudinary } = require('../utils/cloudinaryService');

exports.addBook = async (req, res) => {
    const { title, author, publishYear, rating, description } = req.body;
    const image = req.files?.image; // Add null check
    const pdfFile = req.files?.pdf; // Add null check
  
    try {
      if (!image || !pdfFile) {
        console.error('No files uploaded');
        return res.status(400).send('Please upload both an image and a PDF');
      }
  
      // Log the received file details
      console.log('Image details:', image);
      console.log('PDF details:', pdfFile);
  
      // Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary(image, 'books/images');
      console.log('Image uploaded to Cloudinary:', imageUrl);
  
      // Upload PDF to Cloudinary
      const pdfUrl = await uploadToCloudinary(pdfFile, 'books/pdfs');
      console.log('PDF uploaded to Cloudinary:', pdfUrl);
  
      // Save book data to MongoDB with Cloudinary URLs
      const newBook = new Book({
        title,
        author,
        publishYear,
        rating,
        description,
        image: imageUrl,
        pdf: {
          data: pdfUrl,
          contentType: pdfFile.mimetype,
        },
      });
  
      await newBook.save();
      res.status(200).send('Book uploaded successfully');
    } catch (err) {
      console.error('Error uploading book:', err);  // Log the entire error object
      res.status(500).send(`Error uploading book: ${err.message}`);
    }
  };
  


// Get all ebooks (with Cloudinary image URLs)
exports.getEbooks = async (req, res) => {
    try {
        const books = await Book.find({});
        const moreBooks = await Book.find({});
        
        res.render('ebook', {
            books, // Pass the books array to the template
            moreBooks
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching books');
    }
};

// Fetch a book by its ID (Cloudinary URLs included)
// Example of fetching book and ensuring pdf URL is available
const getBookById = async (id) => {
    try {
        const book = await Book.findById(id);
        // Assume you have logic here to set the correct PDF URL in the book object
        return book;
    } catch (error) {
        console.error('Error fetching book:', error);
        return null;
    }
};



exports.getBookDetails = async (req, res) => {
    const bookId = req.params.id;
    const book = await getBookById(bookId);

    if (book) {
        res.render('detail-ebook', {
            title: book.title,
            book: book,
            imageUrl: book.image,
            pdfUrl: book.pdf.url, // Ensure this is set correctly
            downloadUrl: `/download-pdf/${book._id}`
        });
    } else {
        res.render('error', {
            message: 'Book not found',
        });
    }
};
