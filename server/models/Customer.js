const { default: mongoose } = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  careOf: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  phone: {
    type: String,
    required: true,
    trim:true
  },
  aadhaar:{
    type: String,
    required: true,
    unique:true,
    trim:true
  },
  address:{
    type: String,
    required: true,
    trim:true
  },
  profilePic: {
    type: String,
    default: "",
  },
  createdAt: { type: Date, default: Date.now }, // Add this field
});

module.exports = mongoose.model("Customer", CustomerSchema);
