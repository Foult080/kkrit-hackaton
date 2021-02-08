const mongoose = require("mongoose");
const EmployerSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  vacancy: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      skills: {
        type: [String],
        required: true,
      },
    },
  ],
});

module.exports = Employer = mongoose.model("employers", EmployerSchema);
