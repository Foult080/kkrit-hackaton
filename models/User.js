const mongoose = require("mongoose");
const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: "user"
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Users = mongoose.model("users", UsersSchema);
