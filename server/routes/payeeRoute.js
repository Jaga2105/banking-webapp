const { addNewPayee, getAllPayees } = require("../controllers/payee");

const router = require("express").Router();

router.post("/addPayee", addNewPayee);
router.get("/getPayees", getAllPayees);

module.exports = router;