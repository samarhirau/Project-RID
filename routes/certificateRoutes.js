const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const multer = require('multer');
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

router.post('/upload', upload.single('certificate'), certificateController.uploadCertificate);
router.post('/find-certificate', certificateController.findCertificate);
router.get('/download', certificateController.downloadCertificate);
router.get('/view', certificateController.viewCertificate);

module.exports = router;
