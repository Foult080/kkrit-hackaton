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
    },
    link: {
      type: String,
      default: "ссылка не добавлена",
    },
  },
  capt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  team: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      status: {
        type: String,
        default: "teammate"
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Teams = mongoose.model("teams", TeamsSchema);
