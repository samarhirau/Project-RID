// const Organisation = require('../models/organisation');

// // Controller to handle creating a new organization
// exports.createOrganisation = async (req, res) => {
//   try {
//     const { organisationName, city, state, ownerName, contactNumber, registrationNumber, websiteLink,certificateFile,certificateFile2,certificateFile3 } = req.body;

//     // Create a new organization instance
//     const newOrganisation = new Organisation({
//       organisationName,
//       city,
//       state,
//       ownerName,
//       contactNumber,
//       registrationNumber,
//       websiteLink,
//       certificateFile,
//       certificateFile2,
//       certificateFile3
//     });

//     // Save organization to the database
//     await newOrganisation.save();

//     // Success response
//     // res.status(201).json({ message: 'Organisation created successfully', organisation: newOrganisation });
//     res.redirect("/org")
//   } catch (error) {
//     console.error(error);

//     // Handle duplicate key error
//     if (error.code === 11000) {
//       res.status(400).json({ message: 'Duplicate key error: Organisation or registration number already exists.' });
//     } else {
//       res.status(400).json({ message: 'Error creating organisation', error: error.message });
//     }
//   }
// };

// please no create collision

// const Organisation = require('../models/organisation');
// const path = require('path');
// const fs = require('fs');

// // Controller to handle creating a new organization
// exports.createOrganisation = async (req, res) => {
//   try {
//     const {
//       organisationName,
//       city,
//       state,
//       ownerName,
//       contactNumber,
//       registrationNumber,
//       websiteLink
//     } = req.body;

//     // Check if files are uploaded
//     const certificateFile = req.files.certificateFile;
//     const certificateFile2 = req.files.certificateFile2;
//     const certificateFile3 = req.files.certificateFile3;

//     // Define the upload directory and ensure it exists
//     const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
    
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if not exists
//     }

//     // Define paths for saving files
//     const certificatePath = path.join(uploadDir, certificateFile.name);
//     const certificatePath2 = path.join(uploadDir, certificateFile2.name);
//     const certificatePath3 = path.join(uploadDir, certificateFile3.name);

//     // Move the files to the upload folder
//     await certificateFile.mv(certificatePath);
//     await certificateFile2.mv(certificatePath2);
//     await certificateFile3.mv(certificatePath3);

//     // Create a new organization instance
//     const newOrganisation = new Organisation({
//       organisationName,
//       city,
//       state,
//       ownerName,
//       contactNumber,
//       registrationNumber,
//       websiteLink,
//       certificateFile: `/uploads/${certificateFile.name}`,
//       certificateFile2: `/uploads/${certificateFile2.name}`,
//       certificateFile3: `/uploads/${certificateFile3.name}`
//     });

//     // Save organization to the database
//     await newOrganisation.save();

//     // Success response
//     res.status(201).json({ message: 'Organisation created successfully', organisation: newOrganisation });
//   } catch (error) {
//     console.error(error);

//     if (error.code === 11000) {
//       res.status(400).json({ message: 'Duplicate key error: Organisation or registration number already exists.' });
//     } else {
//       res.status(400).json({ message: 'Error creating organisation', error: error.message });
//     }
//   }
// };

const Organisation = require('../models/organisation');

// Controller to handle creating a new organization
exports.createOrganisation = async (req, res) => {
  try {
    const {
      organisationName,
      city,
      state,
      ownerName,
      contactNumber,
      registrationNumber,
      websiteLink
    } = req.body;

    // Check if files are uploaded
    const certificateFile = req.files.certificateFile;
    const certificateFile2 = req.files.certificateFile2;
    const certificateFile3 = req.files.certificateFile3;

    // Convert the uploaded files to binary (buffer)
    const certificateFileData = {
      data: certificateFile.data, // binary data from the uploaded file
      contentType: certificateFile.mimetype
    };

    const certificateFile2Data = {
      data: certificateFile2.data,
      contentType: certificateFile2.mimetype
    };

    const certificateFile3Data = {
      data: certificateFile3.data,
      contentType: certificateFile3.mimetype
    };

    // Create a new organization instance
    const newOrganisation = new Organisation({
      organisationName,
      city,
      state,
      ownerName,
      contactNumber,
      registrationNumber,
      websiteLink,
      certificateFile: certificateFileData,   // store binary data
      certificateFile2: certificateFile2Data, // store binary data
      certificateFile3: certificateFile3Data  // store binary data
    });

    // Save organization to the database
    await newOrganisation.save();

    // Success response
    // res.status(201).json({ message: 'Organisation created successfully', organisation: newOrganisation });
    res.redirect("/org")
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      res.status(400).json({ message: 'Duplicate key error: Organisation or registration number already exists.' });
    } else {
      res.status(400).json({ message: 'Error creating organisation', error: error.message });
    }
  }
};
