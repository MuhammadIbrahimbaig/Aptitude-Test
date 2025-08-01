const express = require("express");
const router = express.Router();
const UserController = require("../Controller/function");
const AdminLogin = require("../AdminController/AdminAuth");
const Room = require("../Controller/Room");
const multer = require("multer");
// router.post("/save", UserController.Register);
// router.get("/read", UserController.read)
// router.delete("/remove/:id", UserController.DeleteRecord);
// router.put("/edit/:a", UserController.EditRecord);

// Ibrahim Routing Section
router.get("/read", Room.Read);
// ✅ Add this line to serve static files from the uploads folder
router.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
router.post("/saveroom", upload.single("image"), Room.CreateRoom);

// Asfhan Routing Section
router.post("/", UserController.Register);
router.post("/login", UserController.Login);
router.post("/AdminLogin", AdminLogin.AdminLogin);

module.exports = router;

