const {getUserHistory} = require("../service/historyService");
const {Success} = require("../../utils/response");
const errorHandler = require("../../utils/errorHandler");
exports.getUserHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const history = await getUserHistory(userId);
        return Success(res, "User history retrieved successfully", {history});
    } catch (error) {
        return errorHandler(req, res, error);
    }
};