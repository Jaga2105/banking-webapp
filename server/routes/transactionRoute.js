const { transferMoney, mobileRecharge, electricityBillPayment } = require("../controllers/transaction");

const router = require("express").Router();

router.post("/transferMoney", transferMoney)
router.post("/mobileRecharge", mobileRecharge)
router.post("/electricityBillPayment", electricityBillPayment)
module.exports = router;