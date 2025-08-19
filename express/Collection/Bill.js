const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
    booking_id: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    services: [
        {
            name: String,   // e.g. "Food", "Laundry"
            price: Number,
        },
    ],
    room_charges: { type: Number, required: true },
    service_charges: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total_amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bill", BillSchema);
