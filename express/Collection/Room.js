let mongo = require("mongoose");

let room_structure = mongo.Schema({
    room_number: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true, // e.g. Single, Double, Deluxe
    },
    price: {
        type: Number,
        required: true
    },
    is_available: {
        type: Boolean,
        default: true
    },
    capacity: {
        type: Number,
        required: true
    },
    features: {
        type: [String], // e.g. ['AC', 'Wi-Fi', 'TV']
        default: []
    },
    Record_time: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("rooms", room_structure);
