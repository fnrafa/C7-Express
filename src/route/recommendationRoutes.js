const router = require('express').Router();
const controller = require('../api/controller/recommendationController');
const authorize = require("../middleware/authorize");
const validate = require("../validation/recommendationValidator");

router.post('/', authorize(["user", "admin"]), validate.Recommendation, controller.getRecommendation);
router.post('/type', authorize(["user", "admin"]), validate.RecommendationByType, controller.getRecommendationByType);

module.exports = router;
