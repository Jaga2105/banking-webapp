const { default: mongoose } = require("mongoose");
const Customer = require("../models/Customer");

exports.transferMoney = async (req, res) => {
  const { senderAccountNo, receiverAccountNo, amount, description } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  console.log(receiverAccountNo);

  try {
    // 1. Find sender & receiver by accountNo
    const sender = await Customer.findOne({
      accountNo: senderAccountNo,
    }).session(session);
    console.log();

    const receiver = await Customer.findOne({
      accountNo: receiverAccountNo,
    }).session(session);
    console.log(sender);

    console.log(receiver);
    if (!sender || !receiver) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    if (sender.accountBalance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
      });
    }

    // 2. Deduct from sender
    sender.accountBalance -= amount;
    sender.transactions.unshift({
      name: receiver.name,
      amount,
      type: "debit",
      from: sender._id,
      to: receiver._id,
      description,
      createdAt: new Date(),
    });

    // 3. Add to receiver
    console.log(typeof receiver.accountBalance);
    console.log(typeof amount);
    receiver.accountBalance += +amount;
    receiver.transactions.unshift({
      name: sender.name,
      amount,
      type: "credit",
      from: sender._id,
      to: receiver._id,
      description,
      createdAt: new Date(),
    });

    // 4. Save both in transaction
    await sender.save({ session });
    await receiver.save({ session });

    // 5. Commit if everything succeeds
    await session.commitTransaction();
    console.log("Transfer successful!");

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Transfer successful",
    });
  } catch (error) {
    // 6. Rollback if any error occurs
    await session.abortTransaction();
    console.error("Transfer failed:", error.message);

    // Send error response
    return res.status(500).json({
      success: false,
      message: "Transfer failed",
      error: error.message,
    });
  } finally {
    // 7. End the session
    session.endSession();
  }
};
