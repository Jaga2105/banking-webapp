const Customer = require("../models/Customer");
const Payee = require("../models/Payee");

exports.addNewPayee = async (req, res) => {
  const { bankName, bankLogo, accountNo, payeeName } = req.body;

  if (!bankName || !bankLogo || !accountNo || !payeeName) {
    return res.status(400).json({
      error: "Please provide all details",
    });
  }

  const existingPayee = await Payee.findOne({ accountNo });
  const validPayee = await Customer.findOne({accountNo})
  console.log(existingPayee);
  if (existingPayee) {
    return res.status(403).json({
      error: "Payee already exists",
    });
  }
  if (!validPayee) {
    return res.status(403).json({
      error: "Payee A/c no. does n't exist",
    });
  }
  try {

    const newPayee = new Payee({
        bankName, bankLogo, accountNo, payeeName
    });
    await newPayee.save();

    return res.status(200).json({ message: "Payee added successfully!" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: error.message,
    });
  }
};
exports.getAllPayees = async (req, res) => {
  try {
    // Fetch all customers
    const allPayees = await Payee.find({}).sort({ createdAt: -1 }); // No .toArray() needed

    // Return the customers as a JSON response
    return res.json(allPayees);
  } catch (error) {
    // Handle errors
    return res.status(500).json({ error: "Internal Server Error" });
  }
};