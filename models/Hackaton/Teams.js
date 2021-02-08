const mongoose = require("mongoose");
const TeamsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hackaton: {
    hack: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hacks",
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tasks",
    }
  },
  capt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  team: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Teams = mongoose.model("teams", TeamsSchema);
