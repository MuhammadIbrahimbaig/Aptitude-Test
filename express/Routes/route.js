const express = require("express");
const router = express.Router();
const UserController = require("../Controller/function");

router.post("/save", UserController.Register); 


module.exports = router;
