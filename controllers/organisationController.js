const Organisation = require("../models/Organisation");
const { uploadedToCloudinary } = require('../utils/cloudinaryorg');

// Register Organization
const registerOrganisation = async (req, res) => {
  try {
    if (!req.body.organisationName || !req.files.certificateFile1 || !req.files.certificateFile2 || !req.files.certificateFile3) {
      return res.status(400).send("Missing required fields or files");
    }

    const certificateFile1 = req.files.certificateFile1[0].buffer;
    const certificateFile2 = req.files.certificateFile2[0].buffer;
    const certificateFile3 = req.files.certificateFile3[0].buffer;

    // Upload to Cloudinary using buffer
    const uploadedCertificateFile1 = await uploadedToCloudinary(certificateFile1, 'org/certificate1');
    console.log('Certificate File 1 successfully uploaded:', uploadedCertificateFile1.secure_url);
    
   
    const uploadedCertificateFile2 = await uploadedToCloudinary(certificateFile2, 'org/certificate2');
    console.log('Certificate File 2 successfully uploaded:', uploadedCertificateFile2.secure_url); 


    const uploadedCertificateFile3 = await uploadedToCloudinary(certificateFile3, 'org/certificate3');
    console.log('Certificate File 3 successfully uploaded:', uploadedCertificateFile3.secure_url); 
    const organisationData = {
      organisationName: req.body.organisationName,
      city: req.body.city,
      state: req.body.state,
      ownerName: req.body.ownerName,
      contactNumber: req.body.contactNumber,
      registrationNumber: req.body.registrationNumber,
      websiteLink: req.body.websiteLink,
      certificateFile1: uploadedCertificateFile1.secure_url,
      certificateFile2: uploadedCertificateFile2.secure_url,
      certificateFile3: uploadedCertificateFile3.secure_url,
    };

    const organisation = new Organisation(organisationData);
    await organisation.save();

    res.redirect(`/organization-dashboard/${organisation._id}`);
  } catch (error) {
    console.error('Error registering organization:', error);
    res.status(500).send("Error registering organization");
  }
};

// Usage in router

  




// Display Organization Dashboard
const displayDashboard = async (req, res) => {
  try {
    // Fetch organization by ID
    const organisation = await Organisation.findById(req.params.id);

    // Check if the organization exists
    if (!organisation) {
      return res.status(404).send("Organization not found");
    }

    // Render the dashboard page with organization data
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
