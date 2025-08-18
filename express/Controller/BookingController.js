const cron = require("node-cron");
const Booking = require("../Collection/Booking");
const Room = require("../Collection/Room");


let BookingController = {
  CreateBooking: async (req, res) => {
    try {
      // force booking to be pending by default
      const bookingData = {
        ...req.body,
        status: "pending",
        user_id: req.user._id
      };

      const booking = await Booking.create(bookingData);

      res.status(200).json({
        message: "Successfully Created Booking (Pending Approval)",
        data: booking,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },


  // Show Data
  getBooking: async function (req, res) {
    try {
      const book = await Booking.find()
        .populate("room_id", "room_name room_number type price") // room ka data fetch karega
        .populate("user_id", "name email") // ✅ Now this will work
        .exec();

      res.status(200).json({
        message: "Successfully Get Booking",
        data: book
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },


  // Delete
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

  // Update Booking Status
  UpdateBookingStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Find booking
      const booking = await Booking.findById(id);
      if (!booking) {
        return res.status(404).json({ msg: "Booking not found" });
      }

      // Update booking status
      booking.status = status;
      await booking.save();

      // Update room status accordingly
      if (status === "booked") {
        await Room.findByIdAndUpdate(booking.room_id, { status: "booked" });
      } else if (status === "checked-in") {
        await Room.findByIdAndUpdate(booking.room_id, { status: "occupied" });
      } else if (status === "checked-out") {
        await Room.findByIdAndUpdate(booking.room_id, { status: "cleaning" });
      } else if (status === "rejected" || status === "cancelled") {
        await Room.findByIdAndUpdate(booking.room_id, { status: "available" });
      }

      res.json({
        msg: `Booking ${status} successfully`,
        booking: booking,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  },
};

// ---------------- CRON JOBS ---------------- //
cron.schedule("*/1 * * * *", async () => {
  try {
    const now = new Date();

    // Saari bookings jinka check_out ab tak cross ho chuka hai
    const bookings = await Booking.find({
      check_out: { $lt: now },
      status: "checked-in"
    });

    if (bookings.length > 0) {
      for (let b of bookings) {
        b.status = "checked-out";
        await b.save();

        // Room ko cleaning pe daldo
        await Room.findByIdAndUpdate(b.room_id, { status: "cleaning" });
      }
      console.log(`✅ Auto-checked out ${bookings.length} bookings`);
    } else {
      console.log("ℹ️ No bookings found for auto-checkout.");
    }
  } catch (err) {
    console.error("❌Cron error:", err);
  }
});

module.exports = BookingController;
