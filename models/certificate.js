
// const mongoose = require('mongoose');

// const CertificateSchema = new mongoose.Schema({
//   certificateId: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   certificatePath: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model('Certificate', CertificateSchema);

// const mongoose = require('mongoose');

// const CertificateSchema = new mongoose.Schema({
//   certificateId: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   internName: {
//     type: String,
//     required: true,
//   },
//   issueDate: {
//     type: Date,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   certificatePath: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model('Certificate', CertificateSchema);
const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true,
  },
  internName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  certificatePath: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Certificate', CertificateSchema);
