const PDFDocument = require("pdfkit");
const Booking = require("../Collection/Booking");

const GenerateInvoice = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findById(bookingId).populate("user_id room_id");

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // PDF create
    const doc = new PDFDocument();

    // Set headers for download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice_${bookingId}.pdf`
    );

    doc.pipe(res);

    // Title
    doc.fontSize(20).text("Hotel Booking Invoice", { align: "center" });
    doc.moveDown();

    // Booking Info (safe fields)
    doc.fontSize(14).text(`Booking ID: ${booking._id}`);
    doc.text(`Guest Name: ${booking.user_id?.name || "N/A"}`);
    doc.text(`Email: ${booking.user_id?.email || "N/A"}`);
    doc.text(`Room: ${booking.room_id?.roomType || "N/A"}`);
    doc.text(`Check-In: ${booking.checkin || "N/A"}`);
    doc.text(`Check-Out: ${booking.checkout || "N/A"}`);
    doc.text(`Total Price: ${booking.totalPrice || 0} PKR`);
    doc.moveDown();

    // Footer
    doc.fontSize(12).text("Thank you for staying with us!", {
      align: "center",
    });

    doc.end();
  } catch (error) {
    console.error("Invoice Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { GenerateInvoice };
