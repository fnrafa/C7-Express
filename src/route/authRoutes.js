const router = require('express').Router();
const validate = require("../validation/authValidator");
const controller = require('../api/controller/authController');

router.post('/', validate.Auth, controller.auth);

module.exports = router;