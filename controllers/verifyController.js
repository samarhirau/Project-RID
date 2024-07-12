
// // module.exports = { verifyCertificate };
// const Certificate = require('../models/certificate');

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
//           certificatePath: certificate.certificatePath,
//         },
//       });
//     } else {
//       res.status(404).json({ message: 'Certificate is not valid' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to verify certificate' });
//   }
// };

// module.exports = { verifyCertificate };
const path = require('path');
const Certificate = require('../models/certificate');

// Controller to handle certificate verification
const verifyCertificate = async (req, res) => {
  const { certificateId } = req.body;

  try {
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
    res.status(500).json({ error: 'Failed to verify certificate' });
  }
};

// Controller to serve certificate file
const getCertificateFile = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    const filePath = path.resolve(certificate.certificatePath);
    res.sendFile(filePath);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve certificate file' });
  }
};

module.exports = { verifyCertificate, getCertificateFile };
