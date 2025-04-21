const { getUserById, updateUser, changePassword } = require('../controllers/user');

const router = require('express').Router();

router.get("/getuser/:id", getUserById);
router.post("/updateuser/:id",updateUser);
router.post("/changePassword", changePassword)
module.exports = router;