const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();
const otpGenerator = require('otp-generator')
const otp = require('./utils/sendEmail');
// const quizRoutes = require('./routes/quizRoutes');

const connectDB = require('./config/db');
require('./config/passport')(passport); // Initialize Passport with your configuration
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { books, moreBooks } = require('./views/js/ebook');



const userRoutes = require('./Routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/admin');
const verifyRoutes = require('./routes/verify');
const excelRoutes = require('./routes/excelRoutes');
//  const resetpassword  = require('./routes/reset.ejs');

const app = express();
const port = process.env.PORT || 3000;

const crypto = require('crypto');
const { sendEmail } = require('./utils/sendEmail');
const router = require('./Routes/userRoutes');
const secretKey = crypto.randomBytes(64).toString('hex');
console.log(secretKey); // Print the key to use it in your session configuration

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser()); // Add cookie-parser middleware
app.use(cors()); 

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/yes",(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'yes.html'));
})
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/verify', verifyRoutes);
app.use('/api/excel', excelRoutes);
app.use('/send-mail',sendEmail);
// app.use('/reset-password',resetpassword);
// Use quiz routes
// app.use('/api', quizRoutes);


app.use(express.static(path.join(__dirname, 'public')));







// --my code //




app.post('/verify-otp',(req,res)=>{
    const userOTP = req.body.otp;
    console.log(otp)
      res.redirect('/success');
   
  })


app.get('/success',(req,res,next)=>{
    res.redirect("yes");
})
app.get("/success",(req,res)=>{
    res.render("success")
})

// app.post('/send-mail',(req,res)=>{
//     res.render({sendEmail});
// })
// router.post('/reset-password',(req,res)=>{
//     res.render({resetpassword});
// })
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
    res.sendFile(path.join(__dirname, 'public', 'forgotPass.html'));
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









