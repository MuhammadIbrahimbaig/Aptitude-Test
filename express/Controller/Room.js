const Room = require("../Collection/Room");
require("dotenv").config();

let data = {
  CreateRoom: async function (req, res) {
    try {
      let { room_number, type, price, capacity, features, } = req.body;
      let is_available = req.body.is_available === 'true';

      // Convert comma-separated 
      const featuresArray = features.split(',').map(item => item.trim());

      // Check if room already exists
      let existingRoom = await Room.findOne({ room_number });
      if (existingRoom) {
        return res.status(409).json({ msg: "Room number already exists!" });
      }

      // Handle image file
      let imagePath = "";
      if (req.file) {
        imagePath = req.file.path;
      }

      // Create new Room
      let newRoom = new Room({
        room_number,
        type,
        price,
        capacity,
        features: featuresArray,
        is_available,
        image: imagePath,
      });

      await newRoom.save();
      res.status(200).json({ msg: "Room created successfully!" });

    } catch (error) {
      res.status(500).json({ msg: error.message });
      console.log("Room creation error:", error);
    }
  },
  // READ DATA
  Read: async function (req, res) {
    try {
      const rooms = await Room.find()
      res.json(rooms)
    } catch (error) {
      res.status(500).json({e: error.message})
    }
  }

};
module.exports = data;
