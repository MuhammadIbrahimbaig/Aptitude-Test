const mongoose = require("mongoose");

// Service Schema
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // service ka title
  description: { type: String, required: true },
   // service ka detail
 });; 

// Model create karo
const Service = mongoose.model("Service", serviceSchema);

module.exports = { Service };
