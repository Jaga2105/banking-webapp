const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["credit", "debit"],
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  from: {
    // For transfers (optional)
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  to: {
    // For transfers (optional)
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
