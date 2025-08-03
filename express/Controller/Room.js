const Room = require("../Collection/Room");
require("dotenv").config();

let data = {
  CreateRoom: async function (req, res) {
    try {
      let { room_name, room_number, type, price, capacity, features, status} = req.body;

      const featuresArray = features.split(',').map(item => item.trim());
      // Check if room already exists
      let existingRoom = await Room.findOne({ room_number });
      if (existingRoom) {
        return res.status(409).json({ msg: "Room number already exists!" });
      }

      // Handle image file
      let imagePath = "";
      if (req.file) {
        imagePath = req.file.path.replace(/\\/g, '/'); // ✅ Fix Windows-style path
      }


      // Create new Room
      let newRoom = new Room({
        room_name,
        room_number,
        type,
        price,
        capacity,
        features: featuresArray,
        status,
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
      res.status(500).json({ e: error.message })
    }
  },
   // DLt
    DeleteRecord : async  function(req, res){
      try {
        let { id } = req.params
        let find = await Room.findById(id)
        if (!find) {
          res.status(404).json({msg: "Record Not Found"})
        }
        else{
          await Room.findByIdAndDelete(find)
          res.status(200).json({msg: "Room Deleted Succesfully"})
        }
      } catch (error) {
        res.status(404).json({msg:error.message})
      }
    },
// Edit
 // Edit
  
EditRecord: async function (req, res) {
    try {
        let { a } = req.params; // 'a' is the room ID
        const {
            room_number,
            room_name,
            type,
            price,
            capacity,
            status
        } = req.body;

        // Find room by ID
        const existingRoom = await Room.findById(a);
        if (!existingRoom) {
            return res.status(404).json({ msg: "Room not found" });
        }

        // Update room
        await Room.findByIdAndUpdate(a, {
            room_number,
            room_name,
            type,
            price,
            capacity,
            status
        }, { new: true, runValidators: true });

        return res.status(200).json({ msg: "Room updated successfully" });

    } catch (error) {
        console.error("Room edit error:", error.message);
        return res.status(500).json({ msg: error.message });
    }
}

};
module.exports = data;
