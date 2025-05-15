const { default: mongoose } = require("mongoose");

const PayeeSchema = new mongoose.Schema({
  payeeName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  bankName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  accountNo: {
    type: String,
    required: true,
    trim: true,
    maxlength: 11,
    unique: true,
  },
  bankLogo: {
    type: String,
    // required: true,
    default: "",
  },
  // active:{
  //   type: Boolean,
  //   default: false,
  // },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payee", PayeeSchema);
