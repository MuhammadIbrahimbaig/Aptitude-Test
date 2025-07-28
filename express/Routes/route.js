const express = require("express");
const router = express.Router();
const UserController = require("../Controller/function");
const Room = require("../Controller/Room");
const multer = require("multer");
router.post("/save", UserController.Register);
router.get("/read", UserController.read)
router.delete("/remove/:id", UserController.DeleteRecord);
router.put("/edit/:a", UserController.EditRecord);
// HOtel Routes
// Setup multer to save image in 'uploads' folder with original filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Pass image through multer middleware, and then to controller
router.post("/saveroom", upload.single("image"), Room.CreateRoom);
module.exports = router;
