// // const mongoose = require('mongoose');

// // // Define Certificate schema
// // const certificateSchema = new mongoose.Schema({
// //     mobileNumber: { type: String, required: true, unique: true },
// //     certificatePath: { type: String, required: true },
// //     createdAt: { type: Date, default: Date.now }
// // });

// // // Create Certificate model
// // const Certificate = mongoose.model('Certificate', certificateSchema);

// // module.exports = Certificate;
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
