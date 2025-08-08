const mongoose = require('mongoose');

// Department Schema
const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});
const Department = mongoose.model('departments', departmentSchema);

// Role Schema
const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: Number, required: true, unique: true }
});
const Role = mongoose.model('roles', roleSchema);

// Staff Schema
const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'roles', required: true },
  joiningDate: { type: Date },
  salary: { type: Number },
  designation: { type: String }
});
const Staff = mongoose.model('staff', staffSchema);


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'roles', required: true }
});
const User = mongoose.model('users', userSchema);

// **Single export for all models**
module.exports = { Department, Role, Staff, User };
