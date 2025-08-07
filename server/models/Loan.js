const mongoose = require("mongoose");

const loanApplicationSchema = new mongoose.Schema({
  loanType: {
    type: String,
  },
  assetType: {
    type: String,
  },
  carBrandName: {
    type: String,
  },
  carModelName: {
    type: String,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  loanPeriod: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please enter a valid email"],
  },
  bank: {
    type: String,
    required: true,
  },
  accountNo: {
    type: String,
    required: true,
  },
  incomeSlab: {
    type: String,
    required: true,
  },
  bankStatement: {
    type: String, // This would store the file path or URL if stored externally
    required: true,
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  }, // Assuming you have a User model for the applicant
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  adminRequest:{
    type: Boolean,
    default: false,
  },
  adminRequestComment:{
    type: String,
    default: "",
  },
  requestedFile: {
    type: String, // This would store the file path or URL if stored externally
    default: "",
  },
});

module.exports = mongoose.model("LoanApplication", loanApplicationSchema);
