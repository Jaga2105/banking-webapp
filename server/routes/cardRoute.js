const {
  addNewCard,
  getCardsById,
  deleteCardById,
  getAllCards,
  applyCard,
  getAllCardApplications,
} = require("../controllers/card");

const router = require("express").Router();

router.post("/add-new-card", addNewCard);
router.get("/get-cards/:id", getCardsById);
router.get("/get-all-cards", getAllCards);
router.delete("/delete-card/:cardId", deleteCardById);
router.post("/apply-card", applyCard);
router.get("/get-all-card-applications", getAllCardApplications);
module.exports = router;
