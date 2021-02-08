const mongoose = require("mongoose");
const HacksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tasks",
    },
  ],
  status: {
    type: String,
    default: "ready",
  },
  period: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Hacks = mongoose.model("hacks", HacksSchema);
