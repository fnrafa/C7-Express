const service = require("../service/recommendationService");
const errorHandler = require("../../utils/errorHandler");
const { Success } = require("../../utils/response");

exports.getRecommendationByType = async (req, res) => {
    try {
        const { regionId, typeId } = req.body;
        const recommendations = await service.recommendByType({ regionId, typeId });
        return Success(res, "Recommendations by type retrieved successfully", { recommendations });
    } catch (error) {
        return errorHandler(req, res, error);
    }
};

exports.getRecommendation = async (req, res) => {
    try {
        const { regionId } = req.body;
        const recommendations = await service.recommend({ regionId });
        return Success(res, "Recommendations retrieved successfully", { recommendations });
    } catch (error) {
        return errorHandler(req, res, error);
    }
};
