const User = require('../models/user');
const crypto = require('crypto');
const path = require('path'); // Import the path module

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        if (user.password !== hashedPassword) {
            return res.status(401).send('Invalid password');
        }
        req.session.user = user; 
        res.redirect('/?login=success'); // Redirect to index.html with a success query parameter
    } catch (error) {
        res.status(500).send('Internal Server Error');
        console.error("Error:", error);
    }
};


exports.checkSession = (req, res) => {
    if (req.session.user) {
        res.json({
            loggedIn: true,
            user: req.session.user
        });
    } else {
        res.json({ loggedIn: false });
    }
};


exports.logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.sendStatus(200);
    });
};
// Compare this snippet from models/user.js:



   





