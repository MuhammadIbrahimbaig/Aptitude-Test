const Bill = require("../Collection/Bill");
const Booking = require("../Collection/Booking");

const BillController = {
  GenerateBill: async (req, res) => {
    try {
      const { booking_id, services } = req.body;

      const booking = await Booking.findById(booking_id).populate("room_id");
      if (!booking) return res.status(404).json({ message: "Booking not found" });

      // Room charges
      const room_charges = booking.total_price;

      // Service charges
      const service_charges = services.reduce((sum, s) => sum + s.price, 0);

      // Tax (optional)
      const tax = (room_charges + service_charges) * 0.1; // 10%

      // Final total
      const total_amount = room_charges + service_charges + tax;

      const bill = await Bill.create({
        booking_id,
        services,
        room_charges,
        service_charges,
        tax,
        total_amount,
      });

      res.status(200).json({ message: "Bill Generated Successfully", data: bill });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
