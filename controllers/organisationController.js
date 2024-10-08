const Organisation = require("../models/Organisation");

// Register Organization
const registerOrganisation = async (req, res) => {
  try {
    // Validate that required fields and files exist
    if (!req.body.organisationName || !req.body.ownerName || !req.files || !req.files.certificateFile1 || !req.files.certificateFile2 || !req.files.certificateFile3) {
      return res.status(400).send("Missing required fields or files");
    }

    const organisationData = {
      organisationName: req.body.organisationName,
      city: req.body.city,
      state: req.body.state,
      ownerName: req.body.ownerName,
      contactNumber: req.body.contactNumber,
      registrationNumber: req.body.registrationNumber,
      websiteLink: req.body.websiteLink,
      certificateFile1: {
        data: req.files.certificateFile1[0].buffer,
        contentType: req.files.certificateFile1[0].mimetype,
      },
      certificateFile2: {
        data: req.files.certificateFile2[0].buffer,
        contentType: req.files.certificateFile2[0].mimetype,
      },
      certificateFile3: {
        data: req.files.certificateFile3[0].buffer,
        contentType: req.files.certificateFile3[0].mimetype,
      },
    };

    // Create and save the organization
    const organisation = new Organisation(organisationData);
    await organisation.save();

    // Redirect to the organization dashboard
    res.redirect(`/organization-dashboard/${organisation._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering organization");
  }
};

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
