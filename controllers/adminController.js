// const Certificate = require('../models/certificate');

// // Controller to handle certificate upload
// const addCertificate = async (req, res) => {
//   const { certificateId } = req.body;
//   const certificatePath = req.file.path;

//   try {
//     const newCertificate = new Certificate({
//       certificateId,
//       certificatePath,
//     });

//     await newCertificate.save();
//     res.status(200).json({ message: 'Certificate uploaded successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to upload certificate' });
//   }
// };

// module.exports = { addCertificate };

// // Controller to serve certificate file


// const Certificate = require('../models/certificate');

// const addCertificate = async (req, res) => {
//   const { certificateId, internName, issueDate, description } = req.body;
//   const certificatePath = req.file.path;

//   try {
//     const newCertificate = new Certificate({
//       certificateId,
//       internName,
//       issueDate,
//       description,
//       certificatePath,
//     });

//     await newCertificate.save();
//     res.status(200).json({ message: 'Certificate uploaded successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to upload certificate' });
//   }
// };

// module.exports = { addCertificate };


const Certificate = require('../models/certificate');

const addCertificate = async (req, res) => {
  const { certificateId, internName, email, issueDate, description } = req.body;
  const certificatePath = req.file.path;

  try {
    const newCertificate = new Certificate({
      certificateId,
      internName,
      email,
      issueDate,
      description,
      certificatePath,
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

module.exports = { addCertificate };
