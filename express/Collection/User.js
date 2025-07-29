const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles",
        required: true
    }
});

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    code: { type: Number, required: true, unique: true }
});

const Role = mongoose.model("roles", roleSchema);
const User = mongoose.model("users", userSchema);

module.exports = { Role, User };
