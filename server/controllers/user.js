const User = require("../models/User");
const mongoose = require("mongoose");
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        error: "User not found!",
      });
    }
    const { password, ...others } = user._doc;
    return res.status(200).json({
      _id: others._id,
      name: others.name,
      email: others.email,
      profilePic: others.profilePic,
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
      $set: {
        name: userData.name,
        email: userData.email,
        profilePic: userData.profilePic,
      },
    };
    console.log(updatedUser);
    const result = await User.updateOne(filter, updatedUser);
    console.log(result);
    res.json("updated");
  } catch (error) {
    return res.status(500).json("error");
  }
};
