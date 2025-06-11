const { mobileRecharge, electricityBill } = require("../controllers/billPayment");

const router = require("express").Router();

router.post("/mobileRecharge", mobileRecharge);
router.post("/electricityBill", electricityBill);
module.exports = router;