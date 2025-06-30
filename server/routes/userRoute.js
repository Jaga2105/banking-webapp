const { transferMoney } = require('../controllers/transaction');
const { getUserById, updateUser, changePassword, contactUs } = require('../controllers/user');

const router = require('express').Router();

router.get("/getuser/:id", getUserById);
router.post("/updateuser/:id",updateUser);
router.post("/changePassword", changePassword)
router.post("/transferMoney", transferMoney)
router.post("/contactUs", contactUs)
module.exports = router;