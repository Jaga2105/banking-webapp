const { addNewCustomer, getAllCustomers,deleteCustomerById, getCustomerById, changeCustomerStatus, changePassword, getAdminDetails } = require("../controllers/customer");
// const { transferMoney } = require("../controllers/transaction");

const router = require("express").Router();

router.post("/addCustomer", addNewCustomer);
router.get("/getAllCustomers", getAllCustomers)
router.get("/getAdminDetails", getAdminDetails)
router.post("/deleteCustomer", deleteCustomerById)
router.get("/getCustomer/:id", getCustomerById)
router.post("/changeCustomerStatus", changeCustomerStatus)
// router.post("/transferMoney", transferMoney)
module.exports = router;