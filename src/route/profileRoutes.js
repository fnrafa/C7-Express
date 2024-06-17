const router = require('express').Router();
const validate = require("../validation/profileValidator");
const controller = require('../api/controller/profileController');
const authorize = require("../middleware/authorize");

router.patch('/', authorize(["user", "admin"]), validate.Edit, controller.editProfile);

module.exports = router;