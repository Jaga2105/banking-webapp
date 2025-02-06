const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const cors = require("cors")
require('dotenv').config();
const app = express();
const authRoute = require('./routes/authRoute')

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/auth", authRoute)

app.get("/", (req,res)=>{
    res.send("Server is listening")
})
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(5001, console.log("Server listening at port 5001"))

