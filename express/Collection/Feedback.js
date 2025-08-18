const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

// yaha userSchema ki jagah feedbackSchema use karo
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = {  Feedback };

