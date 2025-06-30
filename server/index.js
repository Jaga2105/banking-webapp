const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const multer = require('multer');
require('dotenv').config();
const app = express();
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const payeeRoute = require('./routes/payeeRoute')
const customerRoute = require('./routes/customerRoute')
const billPaymentRoute = require("./routes/billPaymentRoute")
const transactionRoute = require("./routes/transactionRoute")
const loanRoute = require("./routes/loanRoute")

app.use(cookieParser());
app.use(cors());
app.set("view engine", "ejs");

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory as Buffer
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit (adjust as needed)
  }
});
// app.use('/uploads', express.static('uploads')); // Serve static files from 'uploads' directory


app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/payee", payeeRoute)
app.use("/billPayment", billPaymentRoute)
app.use("/admin", customerRoute)
app.use("/transaction", transactionRoute)
app.use("/loan", loanRoute)

app.get("/", (req,res)=>{
    res.send("Server is listening")
})
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(5001, console.log("Server listening at port 5001"))

