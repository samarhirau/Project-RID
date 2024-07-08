const { MongoClient } = require('mongodb');
const path = require('path');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('certificatesDB');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
}

exports.connectDB = connectDB;

exports.uploadCertificate = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'uploaded.html'));
    const { mobileNumber } = req.body;
    const certificateFile = req.file;

    if (!mobileNumber || !certificateFile) {
        return res.status(400).send('Mobile number and certificate file are required');
    }

    try {
        const existingCertificate = await db.collection('certificates').findOne({ mobileNumber });

        if (existingCertificate) {
            return res.status(400).send('The number already exists');
        }

        const certificate = {
            mobileNumber,
            certificatePath: certificateFile.path,
            createdAt: new Date()
        };

        await db.collection('certificates').insertOne(certificate);

        res.sendFile(path.join(__dirname, '..', 'public', 'uploaded.html'));
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};

exports.findCertificate = async (req, res) => {
    const { mobileNumber } = req.body;

    try {
        const certificate = await db.collection('certificates').findOne({ mobileNumber });

        if (certificate) {
            res.status(200).json({ certificatePath: certificate.certificatePath });
        } else {
            res.status(404).json({ message: 'Certificate not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
};

exports.downloadCertificate = (req, res) => {
    const { filePath } = req.query;

    res.download(filePath, (err) => {
        if (err) {
            res.status(500).send('Error downloading the file');
        }
    });
};

exports.viewCertificate = (req, res) => {
    const { filePath } = req.query;

    res.sendFile(path.resolve(filePath), (err) => {
        if (err) {
            res.status(500).send('Error viewing the file');
        }
    });
};
