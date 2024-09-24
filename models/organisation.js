const mongoose = require("mongoose");

const OrganisationSchema = new mongoose.Schema({
  organisationName: { 
    type: String, 
    required: true, 
    trim: true, 
    minlength: 2,
    maxlength: 100,
    unique: true, // Ensure org names are unique
  },
  city: { 
    type: String, 
    required: true, 
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  state: { 
    type: String, 
    required: true, 
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  ownerName: { 
    type: String, 
    required: true, 
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  contactNumber: { 
    type: String, // Store as a string to allow for country codes
    required: true, 
    validate: {
      validator: function(v) {
        return /^\+?[1-9]\d{1,14}$/.test(v); // Ensures E.164 phone format
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  certificateFile: { 
    data: Buffer,
     contentType: String ,
    // Store image URL instead of Base64 
  },
  certificateFile2 :{ 
    data: Buffer,
     contentType: String ,
  // Store image URL instead of Base64 
  },
  certificateFile3 :{ 
    data: Buffer,
    contentType: String , 
    // Store image URL instead of Base64 
  },
  registrationNumber: { 
    type: String, 
    unique: true, // Ensure uniqueness of registration numbers
    sparse: true, // Allow null or undefined registration numbers
  },
  websiteLink: { 
    type: String, 
    validate: {
      validator: function(v) {
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  isDeleted: {
    type: Boolean,
    default: false, // Soft delete field
  },
}, { timestamps: true, versionKey: false }); // Add createdAt and updatedAt

OrganisationSchema.index({ orgName: 1, registrationNumber: 1 }); // Index important fields

module.exports = mongoose.model("Organisation", OrganisationSchema);