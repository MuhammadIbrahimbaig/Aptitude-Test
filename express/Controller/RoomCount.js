// RoomController.js
const Rooms = require("../Collection/Room");
const Staff = require("../Collection/Staff");

// ✅ Get total rooms count
const getRoomCount = async (req, res) => {
  try {
    const count = await Rooms.countDocuments();
    res.status(200).json({ totalRooms: count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching room count", error });
  }
};

// ✅ Get total staff count
const getStaffCount = async (req, res) => {
  try {
    const count = await Staff.countDocuments();
    res.status(200).json({ totalStaff: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const User = require("../Collection/User");

// ✅ Get total users count
const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ totalUsers: count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user count", error });
  }
};



module.exports = { getRoomCount ,getStaffCount, getUserCount};
