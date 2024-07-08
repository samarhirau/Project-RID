const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const multer = require('multer');
require('dotenv').config();
const crypto = require('crypto');




const app = express();
const port = 3000;
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))




mongoose.connect('mongodb://127.0.0.1:27017/students');

const db_ = mongoose.connection;
db_.once('open', () => {
    console.log("Mongodb connection successful");
});

// User schema definition
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    course: { type: String, required: true }
});

const Users = mongoose.model("data", userSchema);

// Serve the form
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Handle form submission and save to MongoDB
app.post('/post', async (req, res) => {
    try {
        const hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
        const user = new Users({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            dob: req.body.dob,
            gender: req.body.gender,
            address: req.body.address,
            course: req.body.course
        });
        await user.save();
        res.send("Data saved");
        console.log("User registered:", req.body);
    } catch (error) {
        res.status(400).send('Email already exists');
        console.error("Error:", error);
    }
});

// Serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle login requests
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email: email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        if (user.password !== hashedPassword) {
            return res.status(401).send('Invalid password');
        }

        // res.send('Login successful');
        res.sendFile(path.join(__dirname, 'public', 'search.html'));
    } catch (error) {
        res.status(500).send('Internal Server Error');
        console.error("Error:", error);
    }
});


















// Replace with your MongoDB connection string
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let db;

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    db = client.db('certificatesDB'); // Replace with your database name
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
}

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ensure uploads directory exists
// if (!fs.existsSync('uploads')) {
//   fs.mkdirSync('uploads');
// }

// Set up Multer for file uploads
const storage = multer.diskStorage({

     //  add this line if you want to save the file in uploads folder
  // destination: (req, file, cb) => {     
  //   cb(null, 'uploads/');
  // },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to display the admin form
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Route to handle form submission
app.post('/upload', upload.single('certificate'), async (req, res) => {

  res.sendFile(path.join(__dirname, 'public', 'uploaded.html'));
  const { mobileNumber } = req.body;
  const certificateFile = req.file;

  if (!mobileNumber || !certificateFile) {
    return res.status(400).send('Mobile number and certificate file are required');
  }

  try {
    const existingCertificate = await db.collection('certificates').findOne({ mobileNumber });

    if (existingCertificate) {
      return res.status(400).send('The number already exists');
    }

    const certificate = {
      mobileNumber,
      certificatePath: certificateFile.path,
      createdAt: new Date()
    };

    await db.collection('certificates').insertOne(certificate);

    res.sendFile(path.join(__dirname, 'public', 'uploaded.html'));
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});








// Route to display the search form
app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

// Route to find a certificate by mobile number
app.post('/find-certificate', async (req, res) => {
  const { mobileNumber } = req.body;

  try {
    const certificate = await db.collection('certificates').findOne({ mobileNumber });

    if (certificate) {
      res.status(200).json({ certificatePath: certificate.certificatePath });
    } else {
      res.status(404).json({ message: 'Certificate not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err });
  }
});

// Route to download the certificate
app.get('/download', (req, res) => {
  const { filePath } = req.query;

  res.download(filePath, (err) => {
    if (err) {
      res.status(500).send('Error downloading the file');
    }
  });
});

// Route to view the certificate
app.get('/view', (req, res) => {
  const { filePath } = req.query;

  res.sendFile(path.resolve(filePath), (err) => {
    if (err) {
      res.status(500).send('Error viewing the file');
    }
  });
});























// Start the server
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
