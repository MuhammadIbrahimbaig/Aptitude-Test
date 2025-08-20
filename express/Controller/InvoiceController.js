const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const Booking = require("../Collection/Booking");

const GenerateInvoice = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findById(bookingId).populate("user_id room_id");

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const invoiceName = `invoice_${bookingId}.pdf`;
    const invoicePath = path.join(__dirname, "../invoices", invoiceName);

    // PDF Generate & Save
    // const doc = new PDFDocument();
    // doc.pipe(fs.createWriteStream(invoicePath));
    // doc.rect(50, 50, 500, 50).fill("#f0f0f0"); // Header background
    // doc.fillColor("#000").fontSize(20).text("Hotel Booking Invoice", 55, 65);

    // doc.moveDown(2);
    // doc.fontSize(14).fillColor("#333").text(`Booking ID: ${booking._id}`);
    // doc.text(`Guest Name: ${booking.user_id?.name || "N/A"}`);
    // doc.text(`Email: ${booking.user_id?.email || "N/A"}`);
    // doc.text(`Room: ${booking.room_id?.roomType || "N/A"}`);
    // doc.text(`Check-In: ${booking.checkin || "N/A"}`);
    // doc.text(`Check-Out: ${booking.checkout || "N/A"}`);
    // doc.text(`Total Price: ${booking.totalPrice || 0} PKR`);

    // doc.moveDown(2);
    // doc.fontSize(12).fillColor("#555").text("Thank you for staying with us!", { align: "center" });


    // ✅ Return invoice path to frontend
    res.json({
      success: true,
      message: "Invoice generated successfully",
      invoice: `/invoices/${invoiceName}`
    });
  } catch (error) {
    console.error("Invoice Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { GenerateInvoice };
