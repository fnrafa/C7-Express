const router = require('express').Router();
const controller = require('../api/controller/historyController');
const authorize = require("../middleware/authorize");

router.get('/', authorize(), controller.getUserHistory);

module.exports = router;