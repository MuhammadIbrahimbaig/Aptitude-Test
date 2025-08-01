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
    is_available: {
        type: Boolean,
        default: true
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
    Record_time: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongo.model("rooms", room_structure);
