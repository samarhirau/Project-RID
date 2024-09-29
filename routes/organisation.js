const express = require("express");
const multer = require("multer");
const { registerOrganisation, displayDashboard } = require("../controllers/organisationController");
const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST: Register Organization
router.post("/", upload.fields([{ name: 'certificateFile1' }, { name: 'certificateFile2' }, { name: 'certificateFile3' }]), registerOrganisation);

// GET: Display Organization Dashboard
router.get("/dashboard/:id", displayDashboard);

module.exports = router;


// // routes/organisation.js
// const express = require("express");
// const multer = require("multer");
// const Organisation = require("../models/Organisation");
// const router = express.Router();

// // Configure multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // POST: Register Organization
// router.post("/", upload.fields([{ name: 'certificateFile1' }, { name: 'certificateFile2' }, { name: 'certificateFile3' }]), async (req, res) => {
//   try {
//     const organisationData = {
//       organisationName: req.body.organisationName,
//       city: req.body.city,
//       state: req.body.state,
//       ownerName: req.body.ownerName,
//       contactNumber: req.body.contactNumber,
//       registrationNumber: req.body.registrationNumber,
//       websiteLink: req.body.websiteLink,
//       certificateFile1: { data: req.files.certificateFile1[0].buffer, contentType: req.files.certificateFile1[0].mimetype },
//       certificateFile2: { data: req.files.certificateFile2[0].buffer, contentType: req.files.certificateFile2[0].mimetype },
//       certificateFile3: { data: req.files.certificateFile3[0].buffer, contentType: req.files.certificateFile3[0].mimetype },
//     };

//     const organisation = new Organisation(organisationData);
//     await organisation.save();
//     res.redirect(`/organization-dashboard/${organisation._id}`);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error registering organization");
//   }
// });

// // GET: Display Organization Dashboard
// router.get("/dashboard/:id", async (req, res) => {
//   try {
//     const organisation = await Organisation.findById(req.params.id);
//     if (!organisation) {
//       return res.status(404).send("Organization not found");
//     }
//     res.render("organization-dashboard", { organization: organisation });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error fetching organization data");
//   }
// });

// module.exports = router;
