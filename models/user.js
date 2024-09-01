

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    role:{ type:String,required:true, },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    },

});

// Use `mongoose.models` to prevent overwriting the model
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
