const mongoose = require("mongoose");

// Staff Schema
const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  joiningDate: Date,
  salary: Number,
  designation: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true }
});
module.exports= mongoose.model('Staff', staffSchema);

