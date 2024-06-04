const router = require('express').Router();
const authValidate = require("../validation/authValidator");
const controller = require('../controller/authController');

router.post('/register', authValidate.Register, controller.register);
router.post('/login', authValidate.Login, controller.login);

module.exports = router;