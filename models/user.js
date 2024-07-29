

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     firstname: { type: String, required: true },
//     lastname: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phone: { type: String, required: true },
//     dob: { type: Date, required: true },
//     gender: { type: String, required: true },
//     course: { type: String, required: true },
    
   
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;


// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    course: { type: String, required: true },
    resetToken: String,
    resetTokenExpiry: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;


