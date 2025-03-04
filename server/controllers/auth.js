const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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

  if (!email || !clientPassword) {
    return res.status(404).json({
      error: "Please provide email and password!",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: "User does n't exist! ",
      });
    }

    const isPasswordValid = await bcrypt.compare(clientPassword, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        error: "Invalid credentials!",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    res.cookie("token", token, { expire: new Date() + 9999 });

    const { password, ...others } = user._doc;
    return res.status(200).json({
      user: {
        _id: others._id,
        username: others.username,
        email: others.email,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// exports.sendForgotPasswordEmailLink = async (req, res) => {
//   const { email } = req.body;
//   console.log(email);
//   if (!email) {
//     return res.status(401).json({ status: 401, message: "Enter Your Email" });
//   }
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ status: 401, message: "Invalid user" });
//     }
//     console.log(user.id);

//     // Token generation for reset password
//     const verificationToken = jwt.sign(
//       { _id: user._id },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );

//     // const result= await transporter.sendMail(mailOptions, (error, info) => {
//     //   if (error) {
//     //     console.error("Error sending email:", error);
//     //     return res.status(500).json({ status: 500, message: "Email not sent" });
//     //   } else {
//     //     console.log("Email sent:", info.response);
//     //     return res.status(201).json({ status: 201, message: "Email sent successfully" });
//     //   }
//     // });
//     // console.log(result)
//   } catch (error) {
//     // console.error("Error:", error);
//     return res.status(500).json({ status: 500, message: "Internal Server Error" });
//   }
// };

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1d",
    });
    const link = `http://localhost:5001/auth/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      // service: "gmail",
      host:process.env.SMTP_HOST,
      port:587,
      secure:false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      text: link,
    };

    const res=await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(res);
  } catch (error) {}
};

exports.sendResetPasswordMail = async(req,res) =>{
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
}
exports.resetPassword = async(req, res)=>{
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
    await User.updateOne(
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
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
}
