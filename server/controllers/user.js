const Customer = require("../models/Customer");
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await Customer.findById(id);
    if (!user) {
      res.status(404).json({
        error: "User not found!",
      });
    }
    const { password, ...others } = user._doc;
    return res.status(200).json({
      // _id: others._id,
      // name: others.name,
      // email: others.email,
      // profilePic: others.profilePic,
      others
    });
  } catch (error) {
    return res.status(500).json("error");
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  console.log(id);
  // console.log(userData);
  // const filt = {_id: mongoose.Types.ObjectId(id)}
  // console.log(filt)
  let filter;
  try {
    filter = { _id: new mongoose.Types.ObjectId(id) };
    console.log("Filter:", filter);
  } catch (error) {
    console.error("Invalid ObjectId:", error);
    return res.status(400).json("Invalid ObjectId");
  }
  try {
    // console.log(mongoose.Types.ObjectId(id))
    // const filter = { _id: new mongoose.Types.ObjectId(id) };
    // console.log(filter)
    const updatedUser = {
      $set:userData
    };
    console.log(updatedUser);
    const result = await Customer.updateOne(filter, updatedUser);
    console.log(result);
    res.json("updated");
  } catch (error) {
    return res.status(500).json("error");
  }
};
exports.changePassword = async (req, res) => {
  const { id, password } = req.body;
  try {
    // Fetch all customers
    // const objectId = new ObjectId(id);
    console.log(id);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await Customer.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
        firstTimeLogin:false
      },
      { new: true } // Returns the updated document (default: false)
    );
    console.log(result);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};