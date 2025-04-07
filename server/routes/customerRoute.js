const { addNewCustomer, getAllCustomers,deleteCustomerById, getCustomerById, changeCustomerStatus } = require("../controllers/customer");

const router = require("express").Router();

router.post("/addCustomer", addNewCustomer);
router.get("/getAllCustomers", getAllCustomers)
router.post("/deleteCustomer", deleteCustomerById)
router.post("/getCustomer", getCustomerById)
router.post("/changeCustomerStatus", changeCustomerStatus)
module.exports = router;