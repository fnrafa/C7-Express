const restaurantService = require("../service/restaurantService");
const errorHandler = require("../../utils/errorHandler");
const { Success } = require("../../utils/response");

exports.getRestaurantDetails = async (req, res) => {
    try {
        const { id } = req.body;
        const userId = req.user.id;
        const restaurant = await restaurantService.getRestaurantDetails(id, userId);
        return Success(res, "Restaurant details retrieved successfully", { restaurant });
    } catch (error) {
        return errorHandler(req, res, error);
    }
};

exports.addReview = async (req, res) => {
    try {
        const { restaurantId, content } = req.body;
        const review = await restaurantService.addReview(restaurantId, content);
        return Success(res, "Review added successfully", { review });
    } catch (error) {
        return errorHandler(req, res, error);
    }
};
