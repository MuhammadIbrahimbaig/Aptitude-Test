const mongoose = require("mongoose");

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
    ref: "roles",
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('user', userSchema);
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
const Staff = mongoose.model('Staff', staffSchema);

// Role Schema
const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: Number, required: true, unique: true },
});
const Role = mongoose.model('Role', roleSchema);



// User Schema
 

// ✅ Export sab models
module.exports = { Role, User };
