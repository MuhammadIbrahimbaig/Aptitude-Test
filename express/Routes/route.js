const express = require("express");
const router = express.Router();
const UserController = require("../Controller/function");
const Room = require("../Controller/Room");
const multer = require("multer");
// router.post("/save", UserController.Register);
// router.get("/read", UserController.read)
// router.delete("/remove/:id", UserController.DeleteRecord);
// router.put("/edit/:a", UserController.EditRecord);

// Ibrahim Routing Section
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
module.exports = router;
