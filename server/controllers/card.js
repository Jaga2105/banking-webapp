const CardApplication = require("../models/CardApplication");
const Cards = require("../models/Cards");

exports.addNewCard = async (req, res) => {
  try {
    console.log(req.body);
    // Since you're using FormData, fields are in req.body and file is in req.file
    const {
      cardNumber,
      cardHolderName,
      expiryDate,
      cvv,
      bankName,
      cardType,
      author,
    } = req.body;

    // Validate required fields
    if (
      !cardNumber ||
      !cardHolderName ||
      !expiryDate ||
      !cvv ||
      !author ||
      !bankName ||
      !cardType
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", error: true });
    }

    const doesCardExist = await Cards.findOne({ author, cardType });
    console.log("Does card exist:", doesCardExist);
    if (doesCardExist) {
      console.log("Card already exists for this user");
      return res.status(400).json({
        message: `${
          cardType === "debit" ? "Debit" : "Credit"
        } card already exist for this user`,
        error: true,
      });
    }
    // Add new card details
    const newCard = new Cards({
      cardNumber,
      cardHolderName,
      expiryDate,
      cvv,
      bankName,
      cardType,
      author,
    });
    const existingCardApplication = await CardApplication.findOne({
      author,
      cardType,
    });
    if (existingCardApplication) {
      // Update the application status to created
      existingCardApplication.isCreated = true;
      await existingCardApplication.save();
    }
    // Save to database
    const savedCard = await newCard.save();

    res.status(201).json({
      message: "Card details added successfully",
      card: savedCard,
    });
  } catch (error) {
    console.error("Error in adding card details:", error);
    res.status(500).json({
      message: "Error in adding card details",
      error: error.message,
    });
  }
};

exports.getCardsById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Cards.find({ author: id });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: true, message: "Cards not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getAllCards = async (req, res) => {
  try {
    const result = await Cards.find({});
    console.log(result);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: true, message: "Cards not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteCardById = async (req, res) => {
  const { cardId } = req.params;
  try {
    // Fetch all customers
    // const objectId = new ObjectId(id);

    const result = await Cards.deleteOne({ _id: cardId });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Card deleted successfully" });
      console.log("Card deleted successfully");
    } else {
      res.status(404).json({ message: "Card not found" });
      console.log("Card not found");
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.applyCard = async (req, res) => {
  try {
    console.log(req.body);
    // Since you're using FormData, fields are in req.body and file is in req.file
    const { bankName, cardType, author } = req.body;

    // Validate required fields
    if (!author || !bankName || !cardType) {
      return res
        .status(400)
        .json({ message: "All fields are required", error: true });
    }

    const doesCardApplicationExist = await CardApplication.findOne({
      author,
      cardType,
    });
    const doesCardExist = await Cards.findOne({ author, cardType });
    if (doesCardApplicationExist) {
      // console.log("Card Application already exists");
      return res.status(400).json({
        message: `You have already applied for ${
          cardType === "debit" ? "Debit" : "Credit"
        } card`,
        error: true,
      });
    }
    if (doesCardExist) {
      // console.log("Card Application already exists");
      return res.status(400).json({
        message: `You already have ${
          cardType === "debit" ? "Debit" : "Credit"
        } card`,
        error: true,
      });
    }
    // Add new card details
    const newCardApplication = new CardApplication({
      bankName,
      cardType,
      author,
    });

    // Save to database
    const savedCardApplication = await newCardApplication.save();

    res.status(201).json({
      message: "Card details added successfully",
      card: savedCardApplication,
    });
  } catch (error) {
    console.error("Error in adding card details:", error);
    res.status(500).json({
      message: "Error in adding card details",
      error: error.message,
    });
  }
};
exports.getAllCardApplications = async (req, res) => {
  try {
    const result = await CardApplication.find({ isCreated: false });
    console.log(result);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: true, message: "Cards not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
