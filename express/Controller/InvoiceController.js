const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const Booking = require("../Collection/Booking");

const GenerateInvoice = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    const booking = await Booking.findById(bookingId)
      .populate("user_id", "name email")
      .populate("room_id", "room_name price");

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Ensure invoices folder exists
    const invoicesDir = path.join(__dirname, "../invoices");
    fs.mkdirSync(invoicesDir, { recursive: true });

    const invoiceName = `invoice_${bookingId}.pdf`;
    const invoicePath = path.join(invoicesDir, invoiceName);

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const stream = fs.createWriteStream(invoicePath);
    doc.pipe(stream);

    // ❗ If you want a background, use PNG/JPG (PDFKit doesn't render SVG)
    // const bg = path.join(__dirname, "../assets/img/hotel_bg.png");
    // if (fs.existsSync(bg)) doc.image(bg, 0, 0, { width: doc.page.width, height: doc.page.height });

    // White panel for readability
    doc.rect(40, 40, doc.page.width - 80, doc.page.height - 80)
      .fillOpacity(0.95).fill("#FFFFFF").fillOpacity(1);

    // ===== Header =====
    doc.fillColor("#1E3A8A").fontSize(26).font("Helvetica-Bold").text("Luxury Hotel", { align: "center" });
    doc.moveDown(0.5);
    doc.fontSize(18).fillColor("#374151").text("Booking Invoice", { align: "center" });
    doc.moveDown(1.5);

    // Helper to draw label/value rows in 2 columns
    const startXLabel = 60;
    const startXValue = 200;
    let y = doc.y;
    const row = (label, value) => {
      doc.font("Helvetica-Bold").fontSize(12).fillColor("#1E3A8A").text(label, startXLabel, y);
      doc.font("Helvetica").fontSize(12).fillColor("#000").text(String(value ?? "N/A"), startXValue, y);
      y += 20;
    };

    // Compute nights if not stored
    const nights = (booking.check_in && booking.check_out)
      ? Math.ceil((new Date(booking.check_out) - new Date(booking.check_in)) / (1000 * 60 * 60 * 24))
      : null;

    // ===== Details =====
    row("Booking ID:", booking._id);
    row("Guest Name:", booking.user_id?.name);
    row("Guest Email:", booking.user_id?.email);
    row("Room:", booking.room_id?.room_name);
    row("Check-in:", booking.check_in ? new Date(booking.check_in).toDateString() : "N/A");
    row("Check-out:", booking.check_out ? new Date(booking.check_out).toDateString() : "N/A");
    if (nights != null) row("Nights:", nights);
    row("Adults:", booking.adult);
    row("Children:", booking.child);

    // Separator line
    doc.moveTo(50, y + 10).lineTo(550, y + 10).lineWidth(1).strokeColor("#E5E7EB").stroke();
    y += 30;

    // ===== Price box =====
    const boxTop = y;
    doc.rect(40, boxTop, doc.page.width - 80, 70).fill("#F9FAFB").stroke();

    doc.font("Helvetica-Bold").fontSize(16).fillColor("#111827").text("Total Price", 60, boxTop + 15);

    const formattedTotal = Number(booking.total_price || 0).toLocaleString("en-PK");
    doc.font("Helvetica-Bold").fontSize(20).fillColor("#16A34A")
      .text(`PKR ${formattedTotal}`, 60, boxTop + 12, { align: "right" });

    // ===== Footer =====
    doc.moveDown(6);
    doc.font("Helvetica-Oblique").fontSize(12).fillColor("#555")
      .text("Thank you for choosing Luxury Hotel!", { align: "center" })
      .text("For queries, contact: luxuryhotel@hotel.com", { align: "center" });

    doc.end();

    // Send response after file is written
    stream.on("finish", () => {
      res.json({
        success: true,
        message: "Invoice generated successfully",
        invoice: `/invoices/${invoiceName}`
      });
    });
    stream.on("error", (err) => {
      console.error("Write stream error:", err);
      res.status(500).json({ success: false, message: "Failed to write invoice file" });
    });

  } catch (error) {
    console.error("Invoice Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { GenerateInvoice };
