const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
  },
  cardHolderName: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  cardType: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
});
module.exports = mongoose.model("Cards", cardSchema);
