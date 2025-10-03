const router = require("express").Router();
exports.createNewMessage = async (req, res) => {
  try {
    //Store the message in message collection
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();

    //update the lastMessage in chat collection

    const currentChat = await Chat.findOneAndUpdate(
      {
        _id: req.body.chatId,
      },
      {
        lastMessage: savedMessage._id,
        $inc: { unreadMessageCount: 1 },
      }
    );

    res.status(201).send({
      message: "Message sent successfully",
      success: true,
      data: savedMessage,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
};
exports.getAllMessages = async (req, res) => {
  try {
    const allMessages = await Message.find({ chatId: req.params.chatId }).sort({
      createdAt: 1,
    });
    res.send({
      message: "Messages fetched successfully",
      success: true,
      data: allMessages,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
};
