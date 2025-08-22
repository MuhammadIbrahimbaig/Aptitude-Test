const cron = require("node-cron");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const Booking = require("../Collection/Booking");
const Room = require("../Collection/Room");


let BookingController = {

  CreateBooking: async (req, res) => {
    try {
      const { room_id, checkin, checkout, adults, children } = req.body;

      const checkinDate = new Date(checkin);
      const checkoutDate = new Date(checkout);

      if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
        return res.status(400).json({ message: "Invalid check-in or check-out date format" });
      }

      if (checkoutDate <= checkinDate) {
        return res.status(400).json({ message: "Checkout must be after checkin" });
      }

      const room = await Room.findById(room_id);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }

      const diffTime = Math.abs(checkoutDate - checkinDate);
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const totalPrice = nights * Number(room.price);

      const bookingData = {
        room_id,
        check_in: checkinDate,
        check_out: checkoutDate,
        adult: adults || 0,
        child: children || 0,
        total_price: totalPrice,
        status: "pending",
        user_id: req.user.id,
      };

      let booking = await Booking.create(bookingData);

      // ✅ Populate user and room data for invoice
      booking = await Booking.findById(booking._id)
        .populate("user_id", "name email")
        .populate("room_id", "room_name price");

      // ✅ Generate Invoice PDF
      const invoicePath = path.join(__dirname, `../invoices/invoice_${booking._id}.pdf`);
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      doc.pipe(fs.createWriteStream(invoicePath));

      // Optional: white background panel
      doc.rect(40, 40, doc.page.width - 80, doc.page.height - 80)
        .fillOpacity(0.9)
        .fill("#FFFFFF")
        .fillOpacity(1);

      // Header
      doc.fillColor("#1E3A8A").fontSize(26).font("Helvetica-Bold").text("Luxury Hotel", { align: "center" });
      doc.moveDown(0.5);
      doc.fontSize(18).fillColor("#374151").text("Booking Invoice", { align: "center" });
      doc.moveDown(2);

      // Booking Details
      doc.font("Helvetica-Bold").fontSize(14).fillColor("#1E3A8A").text("Booking Details", { underline: true });
      doc.moveDown(0.5);

      doc.font("Helvetica").fontSize(12).fillColor("#000000");
      doc.text(`Booking ID: ${booking._id}`);
      doc.text(`User Name: ${booking.user_id?.name || "N/A"}`);
      doc.text(`User Email: ${booking.user_id?.email || "N/A"}`);
      doc.text(`Room: ${booking.room_id?.room_name || "N/A"}`);
      doc.text(`Check-in: ${checkinDate.toDateString()}`);
      doc.text(`Check-out: ${checkoutDate.toDateString()}`);
      doc.text(`Adults: ${booking.adult}`);
      doc.text(`Children: ${booking.child}`);
      doc.text(`Nights: ${nights}`);

      doc.moveDown(1);
      doc.strokeColor("#E5E7EB").lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(1);

      // Price section
      const boxTop = doc.y;
      doc.rect(40, boxTop, doc.page.width - 80, 70).fill("#F9FAFB").stroke();
      doc.font("Helvetica-Bold").fontSize(16).fillColor("#111827").text("Total Price", 60, boxTop + 15);
      doc.font("Helvetica-Bold").fontSize(20).fillColor("#16A34A")
        .text(`$${booking.total_price}`, 400, boxTop + 12, { align: "right" });

      // Footer
      doc.moveDown(6);
      doc.fontSize(12).fillColor("#555555").font("Helvetica-Oblique");
      doc.text("Thank you for choosing Luxury Hotel!", { align: "center" });
      doc.text("For queries, contact: luxuryhotel@hotel.com", { align: "center" });

      doc.end();

      res.status(200).json({
        message: "Successfully Created Booking (Pending Approval)",
        data: booking,
        invoice: `/invoices/invoice_${booking._id}.pdf`
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
cron.schedule("0 0 * * *", async () => {
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
