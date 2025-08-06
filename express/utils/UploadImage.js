const v2 = require("../cloudinaryConfig");

const uploadPromises = async (images) => {
  const uploads = images.map((image) => {
    return new Promise((resolve, reject) => {
      if (!image.buffer || image.buffer.length === 0) {
        return reject(new Error("Invalid image buffer."));
      }

      const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
      if (image.size > MAX_FILE_SIZE) {
        return reject(new Error("File size exceeds the 10MB limit."));
      }

      const stream = v2.uploader.upload_stream(
        {
          folder: "hotel-management",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(new Error("Error uploading image to Cloudinary."));
          }

          if (!result || !result.secure_url) {
            return reject(new Error("No image URL returned by Cloudinary."));
          }

          return resolve({ src: result.secure_url });
        }
      );

      try {
        stream.end(image.buffer); // this MUST be inside try
      } catch (streamErr) {
        return reject(new Error("Failed to end stream: " + streamErr.message));
      }
    });
  });

  return Promise.all(uploads);
};

module.exports = uploadPromises;
