// RoomController.js
const Rooms = require("../Collection/Room");

// ✅ Get total rooms count
const getRoomCount = async (req, res) => {
  try {
    const count = await Rooms.countDocuments();
    res.status(200).json({ totalRooms: count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching room count", error });
  }
};

module.exports = { getRoomCount };
