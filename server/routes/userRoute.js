const { getUserById, updateUser } = require('../controllers/user');

const router = require('express').Router();

router.get("/getuser/:id", getUserById);
router.post("/updateuser/:id",updateUser);

module.exports = router;