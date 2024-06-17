const express = require('express');
const router = express.Router();
const controller = require('../api/controller/restaurantController');
const authorize = require("../middleware/authorize");
const validate = require("../validation/restaurantValidator");

router.get('/', authorize(["user", "admin"]), validate.GetRestaurant, controller.getRestaurantDetails);
router.post('/review', authorize(["user", "admin"]), validate.Review, controller.addReview);

module.exports = router;
