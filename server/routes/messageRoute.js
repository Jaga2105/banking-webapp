const { createNewMessage, getAllMessages } = require("../controllers/message");

const router = require("express").Router();
router.post("/create-new-message", createNewMessage);
router.get("/get-all-messages/:chatId", getAllMessages);
module.exports = router;