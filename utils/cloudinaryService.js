// const cloudinary = require('cloudinary').v2; // Correct CommonJS syntax
// const fs = require('fs');

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: 'dsfy2dkw3',
//   api_key: '218328419476615',
//   api_secret: 'cx7S3z-2L3Y4d-jG4gx5wkMHfTM',
// });





const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dwjqrxbbp',
  api_key: '956168351819748',
  api_secret: 'VwsVoLXZBAodXYD0YXsLBkrU9oc',
});
const uploadToCloudinary = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto',
      folder: folder,
    });
    fs.unlinkSync(file.tempFilePath); // Delete the file after upload
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

module.exports = { uploadToCloudinary };
