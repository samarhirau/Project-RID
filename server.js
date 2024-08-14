// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const session = require('express-session');
// const passport = require('passport');
// const dotenv = require('dotenv');
// dotenv.config();
// // const quizRoutes = require('./routes/quizRoutes');

// const connectDB = require('./config/db');
// require('./config/passport')(passport); // Initialize Passport with your configuration
// const cookieParser = require('cookie-parser');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// const { books, moreBooks } = require('./views/js/ebook');



// const userRoutes = require('./Routes/userRoutes');
// const authRoutes = require('./routes/authRoutes');
// const adminRoutes = require('./routes/admin');
// const verifyRoutes = require('./routes/verify');
// const excelRoutes = require('./routes/excelRoutes');

// const app = express();
// const port = process.env.PORT || 3000;

// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(64).toString('hex');
// console.log(secretKey); // Print the key to use it in your session configuration

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cookieParser()); // Add cookie-parser middleware
// app.use(cors()); 

// app.use(session({
//   secret: secretKey,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // Set to true if using HTTPS
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.use('/user', userRoutes);
// app.use('/auth', authRoutes);
// app.use('/admin', adminRoutes);
// app.use('/verify', verifyRoutes);
// app.use('/api/excel', excelRoutes);
// // Use quiz routes
// // app.use('/api', quizRoutes);


// app.use(express.static(path.join(__dirname, 'public')));




// // SMTP configuration
// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//         user: 'samarhirau.official@gmail.com',
//         pass: 'mpqjpngtfeestrxq'
//     }
// });

// // Endpoint to send the reset email
// app.post('/send-reset-email', (req, res) => {
//     const { email } = req.body;

//     const mailOptions = {
//         from: 'samarhirau.official@gmail.com',
//         to: email,
//         subject: 'Password Reset Request',
//         text: 'Click the link below to reset your password: \n\nhttp://yourwebsite.com/reset-password'
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//             return res.status(500).send('Error sending email');
//         }
//         console.log('Email sent: ' + info.response);
//         res.status(200).send('Email sent successfully');
//     });
// });























// app.get('/api/duration', (req, res) => {
//     const duration = process.env.DURATION;
//     if (!duration) {
//       return res.status(500).json({ error: 'Duration not set in .env file' });
//     }
//     res.json({ duration });
//   });

// app.get('/form', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'form.html'));
// });

// app.get('/ebook', (req, res) => {
//     res.render('ebook', { books, moreBooks });
// });


// app.get('/books', (req, res) => {
//     res.render('book-card', { books, moreBooks }); // Pass the arrays to the EJS template
// });

// app.get('/onlineTest', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', './component/onlineTest.html'));
// });

// app.get('/forgotPassword', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'forgotPass.html'));
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


// app.use((req, res, next) => {
//     res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
// });

// // Set EJS as the view engine
// app.set('view engine', 'ejs');

// // Set the directory where the EJS views are located
// app.set('views', path.join(__dirname, 'views'));





// app.get('/test', async (req, res) => {
//     try {
//         const response = await axios.post(
//             'https://api.openai.com/v1/chat/completions',
//             {
//                 model: 'gpt-3.5-turbo',
//                 messages: [
//                     { role: "system", content: "You are a quiz generator." },
//                     { role: "user", content: "Generate a multiple-choice question about general knowledge." },
//                 ],
//                 max_tokens: 150,
//                 temperature: 0.7
//             },
//             {
//                 headers: {
//                     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );

//         res.json(response.data);
//     } catch (error) {
//         console.error("Test Error:", error);
//         res.status(500).send('Error with AI API');
//     }
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
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const crypto = require('crypto');
const axios = require('axios');
const jwt = require("jsonwebtoken");
dotenv.config();

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/admin');
const verifyRoutes = require('./routes/verify');
const excelRoutes = require('./routes/excelRoutes');

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

// Other routes
app.get('/api/duration', (req, res) => {
  const duration = process.env.DURATION;
  if (!duration) {
    return res.status(500).json({ error: 'Duration not set in .env file' });
  }
  res.json({ duration });
});

app.get('/reset-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reset-password.html'));
});

app.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'forgot-password.html'));
});


app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
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

app.get('/forgotPassword', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'forgot-Password.html'));
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

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Test route for AI API
app.get('/test', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: "system", content: "You are a quiz generator." },
          { role: "user", content: "Generate a multiple-choice question about general knowledge." },
        ],
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Test Error:", error);
    res.status(500).send('Error with AI API');
  }
});

// Start the server
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});



