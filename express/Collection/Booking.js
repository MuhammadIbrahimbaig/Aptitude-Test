let mongo = require("mongoose");

let booking_structure = mongo.Schema({
    user_id: {
        type: mongo.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    room_id: {
        type: mongo.Schema.Types.ObjectId,
        ref: "rooms",
        required: true
    },
    check_in: {
        type: Date,
        required: true
    },
    check_out: {
        type: Date,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["booked", "checked-in", "checked-out", "cancelled"],
        default: "booked"
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongo.model("bookings", booking_structure);
