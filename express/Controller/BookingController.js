const cron = require("node-cron");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const Booking = require("../Collection/Booking");
const Room = require("../Collection/Room");


let BookingController = {
  // CreateBooking: async (req, res) => {
  //   try {
  //     const { room_id, checkin, checkout, adults, children } = req.body;

  //     // 1. Dates parse karo
  //     const checkinDate = new Date(checkin);
  //     const checkoutDate = new Date(checkout);

  //     if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
  //       return res.status(400).json({ message: "Invalid check-in or check-out date format" });
  //     }

  //     if (checkoutDate <= checkinDate) {
  //       return res.status(400).json({ message: "Checkout must be after checkin" });
  //     }

  //     // 2. Room fetch
  //     const room = await Room.findById(room_id);
  //     if (!room) {
  //       return res.status(404).json({ message: "Room not found" });
  //     }

  //     // 3. Nights calculate
  //     const diffTime = Math.abs(checkoutDate - checkinDate);
  //     const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  //     // 4. Total price
  //     const totalPrice = nights * Number(room.price);

  //     if (isNaN(totalPrice)) {
  //       return res.status(400).json({ message: "Invalid room price" });
  //     }

  //     // 5. Booking data schema ke names se match karo
  //     const bookingData = {
  //       room_id,
  //       check_in: checkinDate,
  //       check_out: checkoutDate,
  //       adult: adults || 0,
  //       child: children || 0,
  //       total_price: totalPrice,
  //       status: "pending",
  //       user_id: req.user.id
  //     };

  //     const booking = await Booking.create(bookingData);

  //     res.status(200).json({
  //       message: "Successfully Created Booking (Pending Approval)",
  //       data: booking,
  //     });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // },
  CreateBooking: async (req, res) => {
  try {
    const { room_id, checkin, checkout, adults, children } = req.body;

    // 1. Dates parse karo
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
      return res.status(400).json({ message: "Invalid check-in or check-out date format" });
    }

    if (checkoutDate <= checkinDate) {
      return res.status(400).json({ message: "Checkout must be after checkin" });
    }

    // 2. Room fetch
    const room = await Room.findById(room_id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // 3. Nights calculate
    const diffTime = Math.abs(checkoutDate - checkinDate);
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // 4. Total price
    const totalPrice = nights * Number(room.price);

    if (isNaN(totalPrice)) {
      return res.status(400).json({ message: "Invalid room price" });
    }

    // 5. Booking data schema ke names se match karo
    const bookingData = {
      room_id,
      check_in: checkinDate,
      check_out: checkoutDate,
      adult: adults || 0,
      child: children || 0,
      total_price: totalPrice,
      status: "pending",
      user_id: req.user.id
    };

    const booking = await Booking.create(bookingData);

    // ✅ 6. Invoice PDF Generate
    const invoicePath = path.join(__dirname, `../invoices/invoice_${booking._id}.pdf`);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(invoicePath));

    doc.fontSize(20).text("Hotel Booking Invoice", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Booking ID: ${booking._id}`);
    doc.text(`User ID: ${booking.user_id}`);
    doc.text(`Room: ${room.name}`);
    doc.text(`Check-in: ${checkinDate.toDateString()}`);
    doc.text(`Check-out: ${checkoutDate.toDateString()}`);
    doc.text(`Adults: ${booking.adult}`);
    doc.text(`Children: ${booking.child}`);
    doc.text(`Nights: ${nights}`);
    doc.text(`Total Price: $${totalPrice}`);
    doc.end();

    res.status(200).json({
      message: "Successfully Created Booking (Pending Approval)",
      data: booking,
      invoice: `/invoices/invoice_${booking._id}.pdf` // frontend yahan se fetch kar sakta hai
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},



  // Show Data
  getBooking: async function (req, res) {
    try {
      const book = await Booking.find()
        .populate("room_id", "room_name room_number type price")
        .populate("user_id", "name email")
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
