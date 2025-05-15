const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const cors = require("cors")
require('dotenv').config();
const app = express();
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const payeeRoute = require('./routes/payeeRoute')
const customerRoute = require('./routes/customerRoute')

app.use(cookieParser());
app.use(cors());
app.set("view engine", "ejs");

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/payee", payeeRoute)
app.use("/admin", customerRoute)

app.get("/", (req,res)=>{
    res.send("Server is listening")
})
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(5001, console.log("Server listening at port 5001"))

