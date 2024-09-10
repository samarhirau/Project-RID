const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishYear: { type: Number, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true } , // Storing image as Base64 encoded string
    pdf: { 
        data: Buffer,  // Store PDF as binary data
        contentType: String // Store the content type (e.g., 'application/pdf')
    }
});

module.exports = mongoose.model('Book', bookSchema);


