

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { addCertificate } = require('../controllers/adminController');

// const storage = multer.memoryStorage();
// const upload = multer({ storage });



// router.post('/upload', upload.single('certificate'), addCertificate);

// module.exports = router;



const express = require('express');
const router = express.Router();
const { addCertificate, getRegistrationsCount } = require('../controllers/adminController');
const multer = require('multer');
const authenticateJWT = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole');
const User = require('../models/user'); // Adjust the path as necessary


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('certificate'), addCertificate);
router.get('/registrations/count', getRegistrationsCount); // New route for getting registrations count



router.get('/users', authenticateJWT, authorizeRole('admin'), async (req, res) => {
  try {
    const users = await User.find({}, 'email role gender name dob lastname'); // Fetch all users with email and role
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to search for a user by email
router.get('/search-user', authenticateJWT, authorizeRole('admin'), async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email }, 'email role'); // Search for the user by email

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Return user details
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to change user role
router.post('/change-role', authenticateJWT, authorizeRole('admin'), async (req, res) => {
  const { email, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role; // Update the user role
    await user.save();

    res.json({ message: `User role updated to ${role} for ${email}` });
  } catch (error) {
    console.error('Error changing user role:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.get('/all-admins', authenticateJWT, authorizeRole('admin'), async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }, 'email role'); // Fetch all users with 'admin' role

    if (admins.length === 0) {
      return res.status(404).json({ message: 'No admins found' });
    }

    res.json(admins); // Return the list of admins
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;







