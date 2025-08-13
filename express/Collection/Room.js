let mongo = require("mongoose");

let room_structure = mongo.Schema({
    room_number: {
        type: String,
        required: true,
        unique: true
    },
    room_name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["available", "booked", "cleaning", "maintenance"],
        default: "available"
    },
    capacity: {
        type: Number,
        required: true
    },
    features: {
        type: [String],
        default: []
    },
    image: {
        type: String,
        default: ""
    },
     short_description: {
        type: String,
        maxlength: 300,
        default: ""
    },
    Record_time: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongo.model("rooms", room_structure);
