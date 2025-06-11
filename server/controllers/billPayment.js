const BillPayment = require("../models/BillPayment");

exports.mobileRecharge = async (req, res) => {
  const { phoneNo, planAmount, billType, payerId } = req.body;

  console.log(req.body);
  if (!phoneNo || !planAmount || !billType || !payerId) {
    return res.status(400).json({
      error: "Please provide all details",
    });
  }
  // console.log(phoneNo);
  try {
    const newMobileRecharge = new BillPayment({
      phoneNo,
      planAmount,
      billType,
      payerId,
    });
    await newMobileRecharge.save();

    return res.status(200).json({ message: "Recharge done successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
exports.electricityBill = async (req, res) => {
  const { consumerNo, billAmount, billType, payerId } = req.body;

  console.log(req.body);
  if (!consumerNo || !billAmount || !billType || !payerId) {
    return res.status(400).json({
      error: "Please provide all details",
    });
  }
  // console.log(phoneNo);
  try {
    const newElectricityBill = new BillPayment({
      consumerNo,
      billAmount,
      billType,
      payerId,
    });
    await newElectricityBill.save();

    return res.status(200).json({ message: "Electricity Bill payment done successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
