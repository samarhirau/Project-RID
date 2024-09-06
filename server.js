
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const crypto = require('crypto');
const axios = require('axios');
const jwt = require("jsonwebtoken");
dotenv.config();

const {books ,moreBooks} = require('./views/js/ebook');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/admin');
const verifyRoutes = require('./routes/verify');
const excelRoutes = require('./routes/excelRoutes');
const routes = require('./routes/protected');


// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cors());

app.use(session({
  secret: crypto.randomBytes(64).toString('hex'),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());


require('./config/passport')(passport); // Initialize Passport with your configuration

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/verify', verifyRoutes);
app.use('/api/excel', excelRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);

// Other routes
app.get('/api/duration', (req, res) => {
  const duration = process.env.DURATION;
  if (!duration) {
    return res.status(500).json({ error: 'Duration not set in .env file' });
  }
  res.json({ duration });
});

app.get('/reset-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Reset-Password/reset-password.html'));
});

app.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Forgot-Password/forgot-password.html'));
});


app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '/Signup/form.html'));
});

app.get('/ebook', (req, res) => {
  res.render('ebook', { books, moreBooks });
});

app.get('/books', (req, res) => {
  res.render('book-card', { books, moreBooks }); // Pass the arrays to the EJS template
});

app.get('/onlineTest', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', './component/onlineTest.html'));
});


app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Login/login.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Admin/admin.html'));
});


app.get('/verify', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Certificate-Verification/verify.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/organisation', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'organisation.html'));
});
app.get('/teacher', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'teacher.html'));
});
// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404/404.html'));
});


// Start the server
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});



