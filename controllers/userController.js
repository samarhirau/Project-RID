// const User = require('../models/user');
// const crypto = require('crypto');

// exports.registerUser = async (req, res) => {
//     try {
//         const hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
//         const user = new User({
//             firstname: req.body.firstname,
//             lastname: req.body.lastname,
//             email: req.body.email,
//             password: hashedPassword,
//             phone: req.body.phone,
//             dob: req.body.dob,
//             gender: req.body.gender,
//             // address: req.body.address,
//             course: req.body.course
//         });
//         await user.save();
//         res.send("Data saved");
//         console.log("User registered:", req.body);
//     } catch (error) {
//         res.status(400).send('Email already exists');
//         console.error("Error:", error);
//     }
// };


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
        const token = generateToken(user.userName);
        console.log("Token is : ",token);
        await user.save();
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

