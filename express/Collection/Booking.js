let mongo = require("mongoose");

let booking_structure = mongo.Schema({
    user_id: {
        type: mongo.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    room_id: {
        type: mongo.Schema.Types.ObjectId,
        ref: "rooms",
        required: false
    },
    check_in: {
        type: Date,
        required: true
    },
    check_out: {
        type: Date,
        required: true
    },
    adult: {
        type: Number,
        required: true
    },
    child: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "booked", "checked-in", "checked-out", "cancelled", "rejected"],
        default: "pending" //By default
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongo.model("bookings", booking_structure);
