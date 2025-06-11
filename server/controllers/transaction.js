const { default: mongoose } = require("mongoose");
const Customer = require("../models/Customer");

exports.transferMoney = async (req, res) => {
  const {
    senderAccountNo,
    receiverAccountNo,
    amount,
    payerBankName,
    payeeBankName,
    description,
  } = req.body;
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
    const admin = await Customer.findOne({ isAdmin: true }).session(session);

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

    let transactedAmount;
    if (payerBankName !== payeeBankName) {
      transactedAmount = amount - 10;
    } else {
      transactedAmount = amount;
    }

    // 2. Deduct from sender
    sender.accountBalance -= amount;
    sender.transactions.unshift({
      name: receiver.name,
      amount: transactedAmount,
      type: "debit",
      from: sender._id,
      to: receiver._id,
      description,
      createdAt: new Date(),
    });

    // 3. Add to receiver
    receiver.accountBalance += +amount;
    receiver.transactions.unshift({
      name: sender.name,
      amount: transactedAmount,
      type: "credit",
      from: sender._id,
      to: receiver._id,
      description,
      createdAt: new Date(),
    });
    if (payerBankName !== payeeBankName) {
      admin.accountBalance += +10;
      await admin.save({ session });
    }
    // 4. Save both in transaction
    await sender.save({ session });
    await receiver.save({ session });
    // await admin.save({ session });

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
exports.mobileRecharge = async (req, res) => {
  const { senderAccountNo, phoneNo, amount, description } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Find sender & receiver by accountNo
    const sender = await Customer.findOne({
      accountNo: senderAccountNo,
    }).session(session);

    if (!sender) {
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
      phoneNo: phoneNo,
      amount: amount,
      type: "debit",
      description,
      createdAt: new Date(),
    });

    // 4. Save both in transaction
    await sender.save({ session });

    // 5. Commit if everything succeeds
    await session.commitTransaction();
    console.log("Mobile Recharge successful!");

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Mobile Recharge successful",
    });
  } catch (error) {
    // 6. Rollback if any error occurs
    await session.abortTransaction();
    console.error("Mobile Recharge failed:", error.message);

    // Send error response
    return res.status(500).json({
      success: false,
      message: "Mobile Recharge failed",
      error: error.message,
    });
  } finally {
    // 7. End the session
    session.endSession();
  }
};
exports.electricityBillPayment = async (req, res) => {
  const { senderAccountNo, consumerNo, amount, description } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Find sender & receiver by accountNo
    const sender = await Customer.findOne({
      accountNo: senderAccountNo,
    }).session(session);

    if (!sender) {
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
      consumerNo: consumerNo,
      amount: amount,
      type: "debit",
      description,
      createdAt: new Date(),
    });

    // 4. Save both in transaction
    await sender.save({ session });

    // 5. Commit if everything succeeds
    await session.commitTransaction();
    console.log("Electricity Bill Payment successful!");

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Electricity Bill Payment successful",
    });
  } catch (error) {
    // 6. Rollback if any error occurs
    await session.abortTransaction();
    console.error("Electricity Bill Payment failed:", error.message);

    // Send error response
    return res.status(500).json({
      success: false,
      message: "Electricity Bill Payment successful failed",
      error: error.message,
    });
  } finally {
    // 7. End the session
    session.endSession();
  }
};
