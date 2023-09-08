const mongoose = require("mongoose");
const router = require("../routes/task");

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: {type: String, required: true},
  status: { type: String, enum: ['completed', 'pending']}
});

module.exports = mongoose.model("Task", taskSchema);
