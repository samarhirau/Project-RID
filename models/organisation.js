// models/Organisation.js
const mongoose = require("mongoose");

const OrganisationSchema = new mongoose.Schema({
  organisationName: { type: String, required: true, trim: true, minlength: 2, maxlength: 100, unique: true },
  city: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
  state: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
  ownerName: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  contactNumber: { 
    type: String, 
    required: true, 
    validate: {
      validator: v => /^\+?[1-9]\d{1,14}$/.test(v),
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  registrationNumber: { type: String, unique: true, sparse: true },
  websiteLink: { 
    type: String, 
    validate: {
      validator: v => /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v),
      message: props => `${props.value} is not a valid URL!`
    }
  },
  certificateFile1: { data: Buffer, contentType: String },
  certificateFile2: { data: Buffer, contentType: String },
  certificateFile3: { data: Buffer, contentType: String },
}, { timestamps: true });  

module.exports = mongoose.model("Organisation", OrganisationSchema);
