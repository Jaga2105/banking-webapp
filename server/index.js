const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

require("dotenv").config();
const app = express();
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const payeeRoute = require("./routes/payeeRoute");
const customerRoute = require("./routes/customerRoute");
const billPaymentRoute = require("./routes/billPaymentRoute");
const transactionRoute = require("./routes/transactionRoute");
const loanRoute = require("./routes/loanRoute");
const cardRoute = require("./routes/cardRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cookieParser());
app.use(cors());
app.set("view engine", "ejs");

const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory as Buffer
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit (adjust as needed)
  },
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/payee", payeeRoute);
app.use("/billPayment", billPaymentRoute);
app.use("/admin", customerRoute);
app.use("/transaction", transactionRoute);
app.use("/loan", loanRoute);
app.use("/card", cardRoute);
app.use("/chat", chatRoute)
app.use("/message", messageRoute)
// Test socket connection from client
io.on("connection", (socket) => {
  // console.log("New client connected:" + socket.id);
  // socket.on("disconnect", () => {
  //   console.log("Client disconnected");
  // });
  socket.on("send-message-all", (data) => {
    console.log("Message received:", data);
    socket.emit("send-message-by-server", { text: data.text });
    // io.emit("receive-message", data); // Broadcast the message to all connected clients
  });
});

app.get("/", (req, res) => {
  res.send("Server is listening");
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

server.listen(5001, console.log("Server listening at port 5001"));
