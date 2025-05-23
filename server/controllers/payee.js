const Customer = require("../models/Customer");
const Payee = require("../models/Payee");

exports.addNewPayee = async (req, res) => {
  const { bankName, bankLogo, accountNo, payeeName, payerId } = req.body;

  if (!bankName || !bankLogo || !accountNo || !payeeName || !payerId) {
    return res.status(400).json({
      error: "Please provide all details",
    });
  }

  const existingPayee = await Payee.findOne({ accountNo });
  const validPayee = await Customer.findOne({ accountNo });
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
      bankName,
      bankLogo,
      accountNo,
      payeeName,
      payerId,
    });
    await newPayee.save();

    return res.status(200).json({ message: "Payee added successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
exports.getAllPayees = async (req, res) => {
  const { payerId } = req.params;
  try {
    // Fetch all customers
    const allPayees = await Payee.find({ payerId }).sort({ createdAt: -1 }); // No .toArray() needed
    // Return the customers as a JSON response
    return res.json(allPayees);
  } catch (error) {
    // Handle errors
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getPayeeById = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch all customers
    // const objectId = new ObjectId(id);

    const result = await Payee.findOne({ _id: id });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Payee not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updatePayee = async (req, res) => {
  const { id } = req.params;
  const payeeData  = req.body;
  console.log(id);
  console.log(payeeData);
  // console.log(userData);
  // const filt = {_id: mongoose.Types.ObjectId(id)}
  // console.log(filt)
  // let filter;
  // try {
  //   filter = { _id: new mongoose.Types.ObjectId(id) };
  //   console.log("Filter:", filter);
  // } catch (error) {
  //   console.error("Invalid ObjectId:", error);
  //   return res.status(400).json("Invalid ObjectId");
  // }
  // try {
  //   // console.log(mongoose.Types.ObjectId(id))
  //   // const filter = { _id: new mongoose.Types.ObjectId(id) };
  //   // console.log(filter)
  //   const updatedPayee = {
  //     $set:payeeData
  //   };
  //   console.log(updatedPayee);
  //   const result = await Payee.updateOne(filter, updatedPayee);
  //   console.log(result);
  //   res.json("updated");
  // } catch (error) {
  //   return res.status(500).json("error");
  // }
  try {
    // Fetch all customers
    // const objectId = new ObjectId(id);
    console.log(id);
    // console.log(status);

    const result = await Payee.findByIdAndUpdate(
      id,
      payeeData,
      { new: true } // Returns the updated document (default: false)
    );
    console.log(result);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Payee not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.deletePayeeById = async (req, res) => {
  const { id } = req.body;
  try {
    // Fetch all customers
    // const objectId = new ObjectId(id);

    const result = await Payee.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Payee deleted successfully" });
    } else {
      res.status(404).json({ message: "Payee not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
