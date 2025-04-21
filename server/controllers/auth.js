const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Customer = require("../models/Customer");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: "Please provide name, email and password!",
    });
  }

  const user = await User.findOne({ email });

  if (user)
    return res.status(403).json({
      error: "User already exists",
    });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const { password, ...others } = newUser._doc;

    return res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
exports.login = async (req, res) => {
  const { email, password: clientPassword } = req.body;

  // Validate input
  if (!email || !clientPassword) {
    return res.status(400).json({ // Use 400 for bad request
      error: "Please provide email and password!",
    });
  }

  try {
    // Find user by email
    const user = await Customer.findOne({ email });
    console.log(user)

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        error: "User doesn't exist!",
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(clientPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ // Use 401 for unauthorized
        error: "Invalid credentials!",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    // Set token in cookie
    res.cookie("token", token, { 
      expires: new Date(Date.now() + 9999), // Corrected `expire` to `expires`
      httpOnly: true, // Recommended for security
    });

    // Exclude password from the response
    const { password, ...others } = user._doc;

    // Send success response
    return res.status(200).json({
      // user: {
      //   _id: others._id,
      //   username: others.username,
      //   email: others.email,
      //   name:others.name,
      //   token,
      // },
      user: others
    });
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging
    return res.status(500).json({
      error: "Internal server error. Please try again later.",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ status: "User does not Exists!!" });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1d",
    });
    const link = `${process.env.URL}/auth/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.HOST,
      port: 587,
      secure: false,
      auth: {
        // user: process.env.SMTP_USER,
        user: process.env.EMAIL,
        // pass: process.env.SMTP_PASSWORD,
        pass: process.env.PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      text: link,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return res.status(200).json({ status: "Email sent!" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Failed sending Email", error: error.message });
  }
};

exports.sendResetPasswordMail = async (req, res) => {
  const { id, token } = req.params;
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    res.send("Not Verified");
  }
};
exports.resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    const result = await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    res.json({ status: "Something Went Wrong" });
  }
};
