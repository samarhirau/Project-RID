
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
//   email: {
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
//   certificateFile: {
//     type: Buffer,
//     required: true,
//   },
// });

// module.exports = mongoose.model('Certificate', CertificateSchema);

const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateId: { type: String, required: true, unique: true },
  internName: { type: String, required: true },
  issueDate: { type: Date, required: true },
  description: { type: String, required: true },
  certificateFile: { type: Buffer, required: true }, // Assuming binary data for the file
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;

