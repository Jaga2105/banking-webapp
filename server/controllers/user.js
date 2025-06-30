const Consultee = require("../models/Consultee");
const Customer = require("../models/Customer");
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
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
exports.contactUs = async (req, res) => {
  const { firstName,lastName, email, phone, comments } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !comments
  ) {
    return res.status(400).json({
      error: "Please provide all details",
    });
  }

  // const existingCustomer = await Customer.findOne({ aadhaar });
  // if (existingCustomer) {
  //   return res.status(403).json({
  //     error: "Customer already exists",
  //   });
  // }
  try {
    // const min = 10000000000; // Smallest 11-digit number (10^10)
    // const max = 99999999999; // Largest 11-digit number (10^11 - 1)
    // const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    // const randomPassword = generateDummyPassword();

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(randomPassword, salt);

    const newConsultee = new Consultee({
      firstName,
      lastName,
      email,
      phone,
      comments,
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    var mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: "Requesting for Consultation",
      html: `Requested by:<b>${firstName + lastName}<b/>. <br/> Email: <b>${email}</b> <br/> Phone Number: <b>${phone}</b> <br/> Comments:${comments}`,
      // text: `Account created successfully. This is your password: ${randomPassword}`,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // Continue with customer creation even if email fails
    }

    await newConsultee.save();

    return res.status(200).json({message: "Message sent successfully!" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};