// controllers/organisationController.js
const Organisation = require("../models/Organisation"); // Correct path


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
