

// const Certificate = require('../models/certificate');

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
//     res.status(500).json({ error: 'Failed to upload certificate' });
//   }
// };

// module.exports = { addCertificate };

const multer = require('multer');
const Certificate = require('../models/certificate');

// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

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
    if (error.code === 11000) { // Handle duplicate key error
      res.status(400).json({ message: 'Certificate ID already exists' });
    } else {
      res.status(500).json({ error: 'Failed to upload certificate' });
    }
  }
};

module.exports = { addCertificate, upload };
