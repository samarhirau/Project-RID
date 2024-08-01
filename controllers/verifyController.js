

// const path = require('path');
// const Certificate = require('../models/certificate');

// // Controller to handle certificate verification
// const verifyCertificate = async (req, res) => {
//   const { certificateId } = req.body;

//   try {
//     const certificate = await Certificate.findOne({ certificateId });

//     if (certificate) {
//       res.status(200).json({
//         message: 'Certificate is valid',
//         certificate: {
//           certificateId: certificate.certificateId,
//           internName: certificate.internName,
//           issueDate: certificate.issueDate,
//           description: certificate.description,
//           certificatePath: `/verify/certificate/${certificate._id}`,
//         },
//       });
//     } else {
//       res.status(404).json({ message: 'Certificate is not valid' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to verify certificate' });
//   }
// };

// // Controller to serve certificate file
// const getCertificateFile = async (req, res) => {
//   try {
//     const certificate = await Certificate.findById(req.params.id);

//     if (!certificate) {
//       console.error('Certificate not found in the database');
//       return res.status(404).json({ message: 'Certificate not found' });
//     }

//     const filePath = path.resolve(certificate.certificatePath);
//     console.log('Resolved file path:', filePath);

//     res.sendFile(filePath, (err) => {
//       if (err) {
//         console.error('Error sending file:', err);
//         res.status(500).json({ error: 'Failed to retrieve certificate file' });
//       }
//     });
//   } catch (error) {
//     console.error('Error retrieving certificate:', error);
//     res.status(500).json({ error: 'Failed' });
//   }
// };

// module.exports = { verifyCertificate, getCertificateFile };




const Certificate = require('../models/certificate');

// Controller to handle certificate verification
const verifyCertificate = async (req, res) => {
  const { certificateId } = req.body;

  try {
    console.log('Received certificate ID:', certificateId);
    const certificate = await Certificate.findOne({ certificateId });

    if (certificate) {
      res.status(200).json({
        message: 'Certificate is valid',
        certificate: {
          certificateId: certificate.certificateId,
          internName: certificate.internName,
          issueDate: certificate.issueDate,
          description: certificate.description,
          certificatePath: `/verify/certificate/${certificate._id}`,
        },
      });
    } else {
      res.status(404).json({ message: 'Certificate is not valid' });
    }
  } catch (error) {
    console.error('Error verifying certificate:', error);
    res.status(500).json({ error: 'Failed to verify certificate' });
  }
};

// Controller to serve certificate file
const getCertificateFile = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      console.error('Certificate not found in the database');
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Check if certificateFile exists and log its presence
    if (!certificate.certificateFile) {
      console.error('Certificate file data is missing');
      return res.status(500).json({ error: 'Certificate file data is missing' });
    }

    // Get the binary data
    const certificateBuffer = certificate.certificateFile;

    // Set response headers for downloading the file
    res.setHeader('Content-Disposition', 'attachment; filename=certificate.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', certificateBuffer.length);

    // Send the binary data
    res.send(certificateBuffer);
  } catch (error) {
    console.error('Error retrieving certificate:', error);
    res.status(500).json({ error: 'Failed to retrieve certificate' });
  }
};

module.exports = { verifyCertificate, getCertificateFile };
