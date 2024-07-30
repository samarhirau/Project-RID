const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();
const quizRoutes = require('./routes/quizRoutes');

const connectDB = require('./config/db');
require('./config/passport')(passport); // Initialize Passport with your configuration
const cookieParser = require('cookie-parser');



const userRoutes = require('./Routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/admin');
const verifyRoutes = require('./routes/verify');
const excelRoutes = require('./routes/excelRoutes');

const app = express();
const port = process.env.PORT || 3000;

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
app.use('/api/excel', excelRoutes);
// Use quiz routes
app.use('/api', quizRoutes);

app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/duration', (req, res) => {
    const duration = process.env.DURATION;
    if (!duration) {
      return res.status(500).json({ error: 'Duration not set in .env file' });
    }
    res.json({ duration });
  });

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});
app.get('/onlineTest', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', './component/onlineTest.html'));
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


app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory where the EJS views are located
app.set('views', path.join(__dirname, 'views'));

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



app.listen(port, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${port}`);
});









