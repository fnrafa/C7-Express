const service = require("../service/profileService");
const errorHandler = require("../../utils/errorHandler");
const {Success} = require("../../utils/response");

exports.editProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, fullName, birthDate, gender, password } = req.body;
        const updatedUser = await service.editProfileService(userId, username, fullName, birthDate, gender, password);
        return Success(res, "Profile updated successfully", updatedUser);
    } catch (error) {
        return errorHandler(req, res, error);
    }
}