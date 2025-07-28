const express = require("express");
const router = express.Router();
const UserController = require("../Controller/function");

router.post("/save", UserController.Register);
router.get("/read", UserController.read)
router.delete("/remove/:id", UserController.DeleteRecord);
router.put("/edit/:a", UserController.EditRecord);
module.exports = router;
