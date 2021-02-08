const mongoose = require("mongoose");
const HackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cases: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
    },
  ],
  status: {
    type: String,
    default: "ongoing",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Hack = mongoose.model("hack", HackSchema);
