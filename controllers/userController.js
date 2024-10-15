
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/jwt");

exports.registerUser = async (req, res) => {
    try {
        const { username, lastname, email, password, phone, dob, gender, role } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return renderError(res, 'Email already exists', username, lastname);
        }

        // Create and save a new user with hashed password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds for salt
        const newUser = new User({
            name: username,
            lastname,
            email,
            password: hashedPassword,
            phone,
            dob,
            gender,
            role
        });
        
        const savedUser = await newUser.save();

        // Generate JWT token
        const token = generateToken({ id: savedUser._id, userName: `${savedUser.name} ${savedUser.lastname}` });
        console.log("Token generated:", token);

        // Render success page
        return renderSuccess(res, 'User successfully registered', username, lastname);

    } catch (error) {
        console.error("Registration error:", error);
        return renderError(res, 'Registration failed. Please try again later.', req.body.username, req.body.lastname);
    }
};

// Helper function to render error
const renderError = (res, message, username, lastname) => {
    return res.render('error', {
        message,
        userName: `${username} ${lastname}`
    });
};

// Helper function to render success
const renderSuccess = (res, message, username, lastname) => {
    return res.render('success', {
        message,
        userName: `${username} ${lastname}`
    });
};
