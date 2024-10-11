const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dsfy2dkw3',
  api_key: '218328419476615',
  api_secret: 'cx7S3z-2L3Y4d-jG4gx5wkMHfTM',
});

// Function to upload buffer to Cloudinary using a stream
const uploadedToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folder, resource_type: 'auto' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Convert buffer into stream and upload to Cloudinary
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

module.exports = { uploadedToCloudinary };
