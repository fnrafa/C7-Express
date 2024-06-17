const service = require("../service/authService");
const errorHandler = require("../../utils/errorHandler");
const { Success } = require("../../utils/response");

exports.auth = async (req, res) => {
    try {
        const { deviceId } = req.body;
        const auth = await service.authService(deviceId);
        return Success(res, "Authenticated successfully", auth);
    } catch (error) {
        return errorHandler(req, res, error);
    }
}
