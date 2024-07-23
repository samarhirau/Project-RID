// // Purpose: Main entry point of the application. It starts the server and connects to the database.

// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const fs = require('fs');
// const session = require('express-session');
// const passport = require('passport');
// require('dotenv').config();
// require('./config/passport')(passport);

// const connectDB = require('./config/db');

// const userRoutes = require('./Routes/userRoutes');
// const authRoutes = require('./routes/authRoutes');
// const adminRoutes = require('./routes/admin');
// const verifyRoutes = require('./routes/verify');
// const app = express();
// const port = process.env.PORT || 3010;

// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(64).toString('hex');
// console.log(secretKey); // Print the key to use it in your session configuration


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));


// // app.use(session({
// //     secret: secretKey,
// //     resave: false,
// //     saveUninitialized: true,
// //     cookie: { secure: false } // Set to true if using HTTPS
// // }));


// app.use(session({
//     secret: secretKey,
//     resave: false,
//     saveUninitialized: true
//   }));
  




// // Other routes and middleware


// app.use('/user', userRoutes);
// app.use('/auth', authRoutes);
// app.use('/admin', adminRoutes);
// app.use('/verify', verifyRoutes);
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/form', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'form.html'));
// });

// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

// app.get('/admin', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'admin.html'));
// });

// app.get('/search', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'search.html'));
// });

// app.get('/verify', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'verify.html'));
// });

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });






// app.listen(port, async () => {
//     await connectDB();
//     console.log(`Server is running on http://localhost:${port}`);
// });









const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const connectDB = require('./config/db');
require('./config/passport')(passport); // Initialize Passport with your configuration
const cookieParser = require('cookie-parser');


const userRoutes = require('./Routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/admin');
const verifyRoutes = require('./routes/verify');

const app = express();
const port = process.env.PORT || 3010;

const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');
console.log(secretKey); // Print the key to use it in your session configuration

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser()); // Add cookie-parser middleware

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/verify', verifyRoutes);

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

app.get('/verify', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'verify.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});




app.listen(port, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${port}`);
});









