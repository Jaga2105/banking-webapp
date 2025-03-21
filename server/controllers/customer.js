const Customer = require("../models/Customer");
// import {ObjectId} from "mongodb"
const { ObjectId } = require("mongodb"); // Import ObjectId


exports.addNewCustomer = async (req, res) => {
  const { name, careOf, phone, aadhaar, address, profilePic } = req.body;

  if (!name || !careOf || !phone || !aadhaar || !address || !profilePic) {
    console.log("test1");
    return res.status(400).json({
      error: "Please provide all details",
    });
  }

  const existingCustomer = await Customer.findOne({ aadhaar });
  console.log(aadhaar);
  console.log(existingCustomer);
  if (existingCustomer) {
    return res.status(403).json({
      error: "Customer already exists",
    });
  }
  try {
    const newCustomer = new Customer({
      name,
      careOf,
      phone,
      aadhaar,
      address,
      profilePic,
    });
    await newCustomer.save();

    return res.status(200).json({ message: "Customer added successfully!" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    // Fetch all customers
    const allCustomers = await Customer.find({}).sort({createdAt: -1}); // No .toArray() needed

    // Return the customers as a JSON response
    return res.json(allCustomers);
  } catch (error) {
    // Handle errors
    console.error("Error fetching customers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.deleteCustomerById = async (req, res) => {
  const { id } = req.body;
  console.log(id)
  try {
    // Fetch all customers
    // const objectId = new ObjectId(id);

    const result = await Customer.deleteOne({ _id: id });
    console.log(result)

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Customer deleted successfully" });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }

  } catch (error) {
    // Handle errors
    // console.error("Error fetching customers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getCustomerById = async (req, res) => {
  const { id } = req.body;
  console.log(id)
  try {
    // Fetch all customers
    // const objectId = new ObjectId(id);

    const result = await Customer.findOne({ _id: id });
    console.log(result)

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }

  } catch (error) {
    // Handle errors
    // console.error("Error fetching customers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

