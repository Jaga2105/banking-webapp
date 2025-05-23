const { addNewPayee, getAllPayees, deletePayeeById, getPayeeById, updatePayee } = require("../controllers/payee");

const router = require("express").Router();

router.post("/addPayee", addNewPayee);
router.get("/getPayees/:payerId", getAllPayees);
router.get("/getPayee/:id", getPayeeById);
router.put("/updatePayee/:id", updatePayee);
router.delete("/deletePayee", deletePayeeById);

module.exports = router;