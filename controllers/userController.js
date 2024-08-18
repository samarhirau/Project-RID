
const User = require('../models/user');
const crypto = require('crypto');
const {jwtAuthMiddleware, generateToken} = require("../utils/jwt")
exports.registerUser = async (req, res) => {
    try {
        const hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            dob: req.body.dob,
            gender: req.body.gender,
            course: req.body.course
        });
        const response =   await user.save();
        const payload = {
            id:response.id,
            userName: response.userName
        }
        console.log(JSON.stringify(payload))
        const token = generateToken(payload);
        console.log("Token is : ",token);
      // Render success EJS view with userName
      res.render('success', { 
        message: "User successfully registered",
        userName: `${req.body.firstname} ${req.body.lastname}` // Pass the user's full name
    });
    console.log("User registered:", req.body);
} catch (error) {
    // Render error EJS view with userName
    res.render('error', { 
        message: 'Email already exists', 
        userName: `${req.body.firstname} ${req.body.lastname}` // Pass the user's full name
    });
    console.error("Error:", error);
}
};

