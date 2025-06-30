const { default: mongoose } = require("mongoose");

const ConsulteeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    maxlength: 10
  },
  comments: {
    type: String,
    // required: true,
    default: "",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Consultee", ConsulteeSchema);
