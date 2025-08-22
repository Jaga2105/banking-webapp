const mongoose = require("mongoose");
const cardApplicationSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true,
  },
  cardType: {
    type: String,
    required: true,
  },
  cardType: {
    type: String,
    required: true,
  },
  isCreated: {
    type: Boolean,
    default: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
});
module.exports = mongoose.model("CardApplication", cardApplicationSchema);
