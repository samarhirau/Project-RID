
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {jwtAuthMiddleware, generateToken} = require("../utils/jwt")
exports.registerUser = async (req, res) => {
    try {
       
        const user = new User({
           name: req.body.username,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            dob: req.body.dob,
            gender: req.body.gender,
            role:req.body.role
        });
        const salt = 10;
        const hasedpssword = await bcrypt.hash(user.password, salt);
        user.password=hasedpssword;
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
        userName: `${req.body.username} ${req.body.lastname}` // Pass the user's full name
    });
    console.log("User registered:", req.body);
} catch (error) {
    // Render error EJS view with userName
    res.render('error', { 
        message: 'Email already exists', 
        userName: `${req.body.username} ${req.body.lastname}` // Pass the user's full name
    });
    console.error("Error:", error);
}
};

