const { default: mongoose } = require("mongoose");

const BillPayment = new mongoose.Schema({
  phoneNo: {
    type: String,
    trim: true,
    maxlength: 10
  },
  planAmount: {
    type: String,
  },
  billType:{
    type:String
  },
  payerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BillPayment", BillPayment);
