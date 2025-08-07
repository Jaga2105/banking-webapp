const Cards = require("../models/Cards");

exports.addNewCard = async (req, res) => {
  try {
    // Since you're using FormData, fields are in req.body and file is in req.file
    const { cardNumber, cardHolderName, expiryDate, cvv, bankName, author } = req.body;

    // Validate required fields
    if (!cardNumber || !cardHolderName || !expiryDate || !cvv || !author || !bankName) {
      return res
        .status(400)
        .json({ message: "All fields are required", error: true });
    }

    // Add new card details
    const newCard = new Cards({
      cardNumber,
      cardHolderName,
      expiryDate,
      cvv,
      bankName,
      author,
    });

    // Save to database
    const savedCard = await newCard.save();
    console.log("Card details added successfully:", savedCard);

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
    console.log(result)

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({error:true, message: "Cards not found" });
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
    co

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
