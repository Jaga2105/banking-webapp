const { addNewCard, getCardsById, deleteCardById } = require("../controllers/card");

const router = require("express").Router();


router.post("/add-new-card", addNewCard);
router.get("/get-cards/:id", getCardsById)
router.delete("/delete-card/:cardId", deleteCardById)
module.exports = router;