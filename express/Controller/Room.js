const Room = require("../Collection/Room"); // import your Room model
require("dotenv").config();

let data = {
  CreateRoom: async function (req, res) {
    try {
      let { room_number, type, price, capacity, features, is_available } = req.body;

      // Convert comma-separated features to array
      const featuresArray = features.split(',').map(item => item.trim());

      // Check if room already exists
      let existingRoom = await Room.findOne({ room_number });
      if (existingRoom) {
        return res.status(409).json({ msg: "Room number already exists!" });
      }

      // Handle image file
      let imagePath = "";
      if (req.file) {
        imagePath = req.file.path; // e.g. uploads/16900000-room.jpg
      }

      // Create new Room
      let newRoom = new Room({
        room_number,
        type,
        price,
        capacity,
        features: featuresArray,
        is_available,
        image: imagePath, // Save image path to MongoDB
      });

      await newRoom.save();
      res.status(200).json({ msg: "Room created successfully!" });

    } catch (error) {
      res.status(500).json({ msg: error.message });
      console.log("Room creation error:", error);
    }
  }
};

module.exports = data;
