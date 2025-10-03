const {
  createNewChat,
  getAllChats,
  markMessageAsRead,
} = require("../controllers/chat");

const router = require("express").Router();
router.post("/create-new-chat", createNewChat);
router.get("/get-all-chats", getAllChats);
router.post("/mark-message-as-read", markMessageAsRead);
module.exports = router;
