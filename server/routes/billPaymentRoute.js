const { mobileRecharge } = require("../controllers/billPayment");

const router = require("express").Router();
console.log("billPaymentRoute.js");

router.post("/mobileRecharge", mobileRecharge);
module.exports = router;