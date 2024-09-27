
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


const fileUpload = require('express-fileupload');
const bookRoutes = require('./routes/bookRoutes');

const organisationRoutes = require("./routes/organisation");
const Organisation = require('./models/Organisation');


// const {books ,moreBooks} = require('./views/js/ebook');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/admin');
const verifyRoutes = require('./routes/verify');
const excelRoutes = require('./routes/excelRoutes');
// const routes = require('./routes/protected');
const authenticateJWT = require('./middleware/authMiddleware');


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
app.use("/api/organisation", organisationRoutes);


// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));



app.use(fileUpload({
  useTempFiles: true,         // Use temporary files before uploading to Cloudinary
  tempFileDir: '/tmp/',       // Directory for storing temporary files
  limits: { fileSize: 100 * 1024 * 1024 }, // Max file size of 100MB
}));


app.use(cookieParser());


app.use('/', bookRoutes)



app.get('/logout', (req, res) => {
  // For sessions, destroy session if used
  if (req.session) {
      req.session.destroy(err => {
          if (err) {
              return res.status(500).send("Could not log out.");
          }
          res.redirect('/login'); // Redirect after logging out
      });
  } else {
      // If using JWT, no need to do anything on server side
      // Just send a response back
      res.json({ message: 'Logged out successfully' });
  }
});

// Middleware function to check user role
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next(); // User has the correct role, proceed to the route handler
    } else {
      res.redirect('/login'); // Redirect to the login page
    }
  };
};


app.get('/books', async (req, res) => {
  try {
      const books = await Book.find({}); // Fetch books from the database
      res.render('books', { moreBooks: books }); // Correctly pass 'books' to the EJS template
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching books');
  }
});


// Route to render the EJS
app.get('/flipbook', (req, res) => {
  res.render('flipbook', {
    title: 'RID Button Flipbook',
    pdfUrl: '/pdf/pdf.pdf',
    downloadUrl: '/images/pdf.rar'
  });
});

app.get('/organization-dashboard',authenticateJWT, async (req, res) => {
  try {
    const organization = await Organisation.findOne(); // Fetch organization data
    if (!organization) {
      return res.status(404).send('Organization not found');
    }
    res.render('organizationDashboard', { organization });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


app.get('/organization-dashboard/:id',authenticateJWT, async (req, res) => {
  try {
      const organisationId = req.params.id;
      const organisation = await Organisation.findById(organisationId);

      if (!organisation) {
          return res.status(404).json({ error: "Organization not found" });
      }

      // Make sure to use the correct variable name when rendering
      res.render("organization-dashboard", { organisation }); // Corrected here
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
  }
});



app.get('/organisation', authenticateJWT, authorizeRole('organisation'),(req, res) => {
  res.render('register-org'); 
});

app.get('/teacher', authenticateJWT, authorizeRole('teacher'), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'teacher.html'));
});

// Route for '/student' - Protected for 'student' role
app.get('/student', authenticateJWT, authorizeRole('student'), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'student.html'));
});

app.get('/admin', authenticateJWT, authorizeRole('admin'), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Admin/admin.html'));
});

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







// app.get('/organisation', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'organisation.html'));
// });
// app.get('/teacher', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'teacher.html'));
// });
// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404/404.html'));
});


// Start the server
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});



