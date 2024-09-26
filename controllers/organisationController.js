const Organisation = require("../models/Organisation");

// Register Organization
const registerOrganisation = async (req, res) => {
  try {
    const organisationData = {
      organisationName: req.body.organisationName,
      city: req.body.city,
      state: req.body.state,
      ownerName: req.body.ownerName,
      contactNumber: req.body.contactNumber,
      registrationNumber: req.body.registrationNumber,
      websiteLink: req.body.websiteLink,
      certificateFile1: { data: req.files.certificateFile1[0].buffer, contentType: req.files.certificateFile1[0].mimetype },
      certificateFile2: { data: req.files.certificateFile2[0].buffer, contentType: req.files.certificateFile2[0].mimetype },
      certificateFile3: { data: req.files.certificateFile3[0].buffer, contentType: req.files.certificateFile3[0].mimetype },
    };

    const organisation = new Organisation(organisationData);
    await organisation.save();
    res.redirect(`/organization-dashboard/${organisation._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering organization");
  }
};

// Display Organization Dashboard
const displayDashboard = async (req, res) => {
  try {
    const organisation = await Organisation.findById(req.params.id);
    if (!organisation) {
      return res.status(404).send("Organization not found");
    }
    res.render("organization-dashboard", { organization: organisation });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching organization data");
  }
};

module.exports = {
  registerOrganisation,
  displayDashboard,
};


// const Organisation = require('../models/Organisation');

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

//     // Convert the uploaded files to binary (buffer)
//     const certificateFileData = {
//       data: certificateFile.data, // binary data from the uploaded file
//       contentType: certificateFile.mimetype
//     };

//     const certificateFile2Data = {
//       data: certificateFile2.data,
//       contentType: certificateFile2.mimetype
//     };

//     const certificateFile3Data = {
//       data: certificateFile3.data,
//       contentType: certificateFile3.mimetype
//     };

//     // Create a new organization instance
//     const newOrganisation = new Organisation({
//       organisationName,
//       city,
//       state,
//       ownerName,
//       contactNumber,
//       registrationNumber,
//       websiteLink,
//       certificateFile: certificateFileData,   // store binary data
//       certificateFile2: certificateFile2Data, // store binary data
//       certificateFile3: certificateFile3Data  // store binary data
//     });

//     // Save organization to the database
//     await newOrganisation.save();

//     // Success response
//     // res.status(201).json({ message: 'Organisation created successfully', organisation: newOrganisation });
//     res.redirect("/organization-dashboard")
//   } catch (error) {
//     console.error(error);

//     if (error.code === 11000) {
//       res.status(400).json({ message: 'Duplicate key error: Organisation or registration number already exists.' });
//     } else {
//       res.status(400).json({ message: 'Error creating organisation', error: error.message });
//     }
//   }
// };
