const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");
// import {ObjectId} from "mongodb"
const { ObjectId } = require("mongodb"); // Import ObjectId

const nodemailer = require("nodemailer");
const generateDummyPassword = require("../helpers/RandomGenerator");

// exports.addNewCustomer = async (req, res) => {
//   const { name, email, phone, aadhaar, address, profilePic } = req.body;

//   if (!name || !email || !phone || !aadhaar || !address || !profilePic) {
//     return res.status(400).json({
//       error: "Please provide all details",
//     });
//   }

//   const existingCustomer = await Customer.findOne({ aadhaar });
//   console.log(aadhaar);
//   console.log(existingCustomer);
//   if (existingCustomer) {
//     return res.status(403).json({
//       error: "Customer already exists",
//     });
//   }
//   try {
//     const min = 10000000000; // Smallest 11-digit number (10^10)
//     const max = 99999999999; // Largest 11-digit number (10^11 - 1)
//     const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
//     console.log(randomNumber);
//     const newCustomer = new Customer({
//       name,
//       email,
//       phone,
//       aadhaar,
//       address,
//       profilePic,
//       accountNo: randomNumber,
//     });

//     const randomPassword = generateDummyPassword();
//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       host: process.env.SMTP_HOST,
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASSWORD,
//       },
//     });

//     var mailOptions = {
//       from: process.env.ADMIN_EMAIL,
//       to: email,
//       subject: "Account Creation Successful",
//       text: `Account created successfully. This is your password: ${randomPassword}`,
//     };
//     try {
//       await transporter.sendMail(mailOptions);
//       console.log("Email sent successfully");
//     } catch (emailError) {
//       console.error("Failed to send email:", emailError);
//       // Continue with customer creation even if email fails
//     }

//     await newCustomer.save();

//     return res.status(200).json({ message: "Customer added successfully!" });
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };

exports.addNewCustomer = async (req, res) => {
  const { name, email, phone, aadhaar, address, profilePic } = req.body;

  if (!name || !email || !phone || !aadhaar || !address || !profilePic) {
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
    const min = 10000000000; // Smallest 11-digit number (10^10)
    const max = 99999999999; // Largest 11-digit number (10^11 - 1)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(randomNumber);
    const randomPassword = generateDummyPassword();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(randomPassword, salt);

    const newCustomer = new Customer({
      name,
      email,
      phone,
      aadhaar,
      address,
      profilePic,
      accountNo: randomNumber,
      password: hashedPassword,
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
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "Account Creation Successful",
      html: `Account created successfully. <br/> This is your password: <b>${randomPassword}</b>`,
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // Continue with customer creation even if email fails
    }

    await newCustomer.save();

    return res.status(200).json({ message: "Customer added successfully!" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: error.message,
    });
  }
};
exports.getAllCustomers = async (req, res) => {
  try {
    // Fetch all customers
    const allCustomers = await Customer.find({}).sort({ createdAt: -1 }); // No .toArray() needed

    // Return the customers as a JSON response
    return res.json(allCustomers);
  } catch (error) {
    // Handle errors
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.deleteCustomerById = async (req, res) => {
  const { id } = req.body;
  try {
    // Fetch all customers
    // const objectId = new ObjectId(id);

    const result = await Customer.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Customer deleted successfully" });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getCustomerById = async (req, res) => {
  const { id } = req.body;
  try {
    // Fetch all customers
    // const objectId = new ObjectId(id);

    const result = await Customer.findOne({ _id: id });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.changeCustomerStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    // Fetch all customers
    // const objectId = new ObjectId(id);
    console.log(id);
    console.log(status);

    const result = await Customer.findByIdAndUpdate(
      id,
      {
        active: status,
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
