const { default: mongoose } = require("mongoose");
const Transaction = require("./Transaction");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  email: {
    type: String,
    required: true,
    unique:true,
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
  accountNo:{
    type:String,
    default:""
  },
  active:{
    type:Boolean,
    default:true
  },
  password:{
    type: String,
    required: true,
    trim:true
  },
  firstTimeLogin:{
    type: Boolean,
    default: true
  },
  accountBalance:{
    type:Number,
    default:0
  },
  transactions:[Transaction.schema],
  createdAt: { type: Date, default: Date.now }, // Add this field
});

module.exports = mongoose.model("Customer", CustomerSchema);
