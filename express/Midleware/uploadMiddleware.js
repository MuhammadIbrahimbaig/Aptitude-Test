// middlewares/upload.js
const multer = require("multer");

const storage = multer.memoryStorage(); // enables .buffer
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

module.exports = upload.array("image", 10); // key: "image"
