

const Certificate = require('../models/certificate');
const User = require('../models/user');
const multer = require('multer');

// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// const addCertificate = async (req, res) => {
//   const { certificateId, internName, issueDate, description } = req.body;
//   const certificateFile = req.file.buffer;

//   try {
//     const newCertificate = new Certificate({
//       certificateId,
//       internName,
//       issueDate,
//       description,
//       certificateFile,
//     });

//     await newCertificate.save();
//     res.status(200).json({ message: 'Certificate uploaded successfully' });
//   } catch (error) {
//     if (error.code === 11000) { // Handle duplicate key error
//       res.status(400).json({ message: 'Certificate ID already exists' });
//     } else {
//       res.status(500).json({ error: 'Failed to upload certificate' });
//     }
//   }
// };
// controllers/adminController.js

const addCertificate = async (req, res) => {
  const { certificateId, internName, issueDate, description } = req.body;
  const certificateFile = req.file.buffer;

  try {
    const newCertificate = new Certificate({
      certificateId,
      internName,
      issueDate,
      description,
      certificateFile,
    });

    await newCertificate.save();
    res.status(200).json({ message: 'Certificate uploaded successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Certificate ID already exists' });
    } else {
      res.status(500).json({ message: 'Failed to upload certificate' });
    }
  }
};


const getRegistrationsCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch registrations count' });
  }
};



// Controller function to get the count of admins
const getAdminCount = async (req, res) => {
  try {
      const adminCount = await User.countDocuments({ role: 'admin' }); 
      res.status(200).json({ count: adminCount });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching admin count' });
  }
};

const getStudentCount = async (req, res) => {
  try {
      const studentCount = await User.countDocuments({ role: 'student' }); 
      res.status(200).json({ count: studentCount });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching student count' });
  }
};

const getTeacherCount = async (req, res) => {
  try {
      const teacherCount = await User.countDocuments({ role: 'teacher' }); 
      res.status(200).json({ count: teacherCount });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching teacher count' });
  }
};
const getOrganisationCount = async (req, res) => {
  try {
      const organisationCount = await User.countDocuments({ role: 'organisation' }); 
      res.status(200).json({ count: organisationCount });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching organisation count' });
  }
};
module.exports = { addCertificate, getRegistrationsCount, getAdminCount,getStudentCount,getTeacherCount ,getOrganisationCount};
