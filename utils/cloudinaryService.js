// const cloudinary = require('cloudinary').v2; // Correct CommonJS syntax
// const fs = require('fs');

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: 'dsfy2dkw3',
//   api_key: '218328419476615',
//   api_secret: 'cx7S3z-2L3Y4d-jG4gx5wkMHfTM',
// });

// const uploadToCloudinary = async (file, folder) => {
//   try {
//     const result = await cloudinary.uploader.upload(file.tempFilePath, {
//       resource_type: 'auto',
//       folder: folder,
//     });
//     fs.unlinkSync(file.tempFilePath); // Delete the file after upload
//     return result.secure_url;
//   } catch (error) {
//     console.error('Cloudinary upload error:', error);
//     throw error;
//   }
// };

// module.exports = { uploadToCloudinary };



const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dwjqrxbbp',
  api_key: '956168351819748',
  api_secret: 'VwsVoLXZBAodXYD0YXsLBkrU9oc',
});
// cloudinary.config({
//   cloud_name: 'dsfy2dkw3',
//   api_key: '218328419476615',
//   api_secret: 'cx7S3z-2L3Y4d-jG4gx5wkMHfTM',
// });

const uploadToCloudinary = async (file, folder) => {
  try {
    // Generate a public ID for the PDF file with a .pdf extension
    const publicId = `${folder}/${file.name.replace(/\s+/g, '_').split('.pdf')[0]}`; // Removes spaces and .pdf extension from name

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'raw',
      public_id: publicId, // Assign the public ID
      folder: folder,
      format: 'pdf', // Explicitly specify the file format as PDF
    });

    fs.unlinkSync(file.tempFilePath); // Delete the temp file after upload

    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};


module.exports = { uploadToCloudinary };
