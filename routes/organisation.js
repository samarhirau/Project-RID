const express = require("express");
const multer = require("multer");
const { registerOrganisation, displayDashboard } = require("../controllers/organisationController");
const router = express.Router();

// Configure multer for file uploads with memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit to 5MB per file
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error("Invalid file type. Only PDF, JPEG, and PNG are allowed.");
      error.code = "LIMIT_FILE_TYPES";
      return cb(error, false);
    }
    cb(null, true);
  },
});

// POST: Register Organization (upload 3 certificate files)
router.post(
  "/",
  upload.fields([{ name: 'certificateFile1' }, { name: 'certificateFile2' }, { name: 'certificateFile3' }]),
  (err, req, res, next) => {
    // Handle file upload errors (optional but recommended)
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).send("File too large. Maximum size is 5MB.");
      }
    } else if (err) {
      if (err.code === "LIMIT_FILE_TYPES") {
        return res.status(400).send("Invalid file type. Only PDF, JPEG, and PNG are allowed.");
      }
      return res.status(400).send(err.message);
    }
    next();
  },
  registerOrganisation
);

// GET: Display Organization Dashboard
router.get("/dashboard/:id", displayDashboard);

module.exports = router;
