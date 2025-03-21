const { addNewCustomer, getAllCustomers,deleteCustomerById, getCustomerById } = require("../controllers/customer");

const router = require("express").Router();

router.post("/addCustomer", addNewCustomer);
router.get("/getAllCustomers", getAllCustomers)
router.post("/deleteCustomer", deleteCustomerById)
router.post("/getCustomer", getCustomerById)
module.exports = router;