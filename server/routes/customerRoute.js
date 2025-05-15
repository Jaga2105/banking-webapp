const { addNewCustomer, getAllCustomers,deleteCustomerById, getCustomerById, changeCustomerStatus, changePassword } = require("../controllers/customer");
// const { transferMoney } = require("../controllers/transaction");

const router = require("express").Router();

router.post("/addCustomer", addNewCustomer);
router.get("/getAllCustomers", getAllCustomers)
router.post("/deleteCustomer", deleteCustomerById)
router.post("/getCustomer", getCustomerById)
router.post("/changeCustomerStatus", changeCustomerStatus)
// router.post("/transferMoney", transferMoney)
module.exports = router;