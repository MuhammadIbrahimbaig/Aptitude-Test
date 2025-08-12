const Booking = require("../Collection/Booking");
const Room = require("../Collection/Room");
let BookingController = {
  CreateBooking: async (req, res) => {
    try {
      const book = new Booking(req.body);
      const booking = await Booking.create(req.body);

      // If booking is created and status is "booked", update room status
      if (booking.status === "booked") {
        await Room.findByIdAndUpdate(booking.room_id, { status: "booked" });
      }
      await book.save();
      res
        .status(200)
        .json({ message: "Successfully Create Booking", data: book });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Show Data
  getBooking: async function (req, res) {
    try {
      const book = await Booking.find();
      res
        .status(200)
        .json({ message: "Successfully Get Booking", data: book });
    } catch (error) {
      res.status(500).json({ m: error.message });
    }
  },
  // DLt
  DeleteRecord: async function (req, res) {
    try {
      let { id } = req.params;
      let find = await Booking.findById(id);
      if (!find) {
        res.status(404).json({ msg: "Record Not Found" });
      } else {
        await Booking.findByIdAndDelete(find);
        res.status(200).json({ msg: "Record Deleted" });
      }
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  },
  EditRecord: async function (req, res) {
    try {
      let { id } = req.params;
      const { status } = req.body;

      // Find room by ID
      const existingRoom = await Booking.findById(a);
      if (!existingRoom) {
        return res.status(404).json({ msg: "Booking not found" });
      }

      // Update room
      await Booking.findByIdAndUpdate(id, {
        status
      }, { new: true, runValidators: true });

      return res.status(200).json({ msg: "Booking updated successfully" });

    } catch (error) {
      console.error("Booking edit error:", error.message);
      return res.status(500).json({ msg: error.message });
    }
  }
};

module.exports = BookingController;