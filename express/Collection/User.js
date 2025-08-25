


const mongoose = require("mongoose");
// user Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",   
     required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("users", userSchema);



