const Room = require("../Collection/Room");
const cloudinary = require("../cloudinaryConfig");
require("dotenv").config();

let data = {
  CreateRoom: async function (req, res) {
    try {
      console.log("Incoming request to /saveroom");
      console.log("Body:", req.body);
      console.log("Files:", req.files);

      let { room_name, room_number, type, price, capacity, features, status } =
        req.body;

      if (!room_name || !room_number || !type || !price) {
        return res.status(400).json({ msg: "Missing required fields" });
      }

      const featuresArray = features
        ? features.split(",").map((f) => f.trim())
        : [];

      const existingRoom = await Room.findOne({ room_number });
      if (existingRoom) {
        return res.status(409).json({ msg: "Room number already exists!" });
      }

      const images = req.files;

      if (!images || images.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "No image file uploaded." });
      }

      const uploadToCloudinary = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "hotel-management" }, (error, result) => {
              if (error) return reject(error);
              resolve({ src: result.secure_url });
            })
            .end(fileBuffer);
        });
      };

      const uploadPromises = images.map((image) => {
        if (!image.buffer || image.buffer.length === 0) {
          throw new Error("Invalid image buffer.");
        }
        const MAX_FILE_SIZE = 10 * 1024 * 1024;
        if (image.size > MAX_FILE_SIZE) {
          throw new Error("File size exceeds the 10MB limit.");
        }
        return uploadToCloudinary(image.buffer);
      });

      const uploadedImages = await Promise.all(uploadPromises);

      const newRoom = new Room({
        room_name,
        room_number,
        type,
        price,
        capacity,
        features: featuresArray,
        status,
        short_description: short_description,
        image: uploadedImages[0].src,
      });

      await newRoom.save();
      console.log("Room saved:", newRoom);

      res.status(200).json({ msg: "Room created successfully!" });
    } catch (error) {
      console.error("Room creation error:", error);
      res.status(500).json({ msg: error.message });
    }
  },
  // READ DATA
  Read: async function (req, res) {
    try {
      const rooms = await Room.find();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ e: error.message });
    }
  },
  // DLt
  DeleteRecord: async function (req, res) {
    try {
      let { id } = req.params;
      let find = await Room.findById(id);
      if (!find) {
        res.status(404).json({ msg: "Record Not Found" });
      } else {
        await Room.findByIdAndDelete(find);
        res.status(200).json({ msg: "Room Deleted Succesfully" });
      }
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  },
  // Edit
  // Edit

  EditRecord: async function (req, res) {
    try {
      let { a } = req.params; // 'a' is the room ID
      const { room_number, room_name, type, price, capacity, status } =
        req.body;

      // Find room by ID
      const existingRoom = await Room.findById(a);
      if (!existingRoom) {
        return res.status(404).json({ msg: "Room not found" });
      }

      // Update room
      await Room.findByIdAndUpdate(
        a,
        {
          room_number,
          room_name,
          type,
          price,
          capacity,
          status,
        },
        { new: true, runValidators: true }
      );

      return res.status(200).json({ msg: "Room updated successfully" });
    } catch (error) {
      console.error("Room edit error:", error.message);
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = data;
