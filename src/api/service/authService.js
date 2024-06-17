const CustomError = require("../../utils/customError");
const getToken = require("../../utils/jwtToken");
const prisma = require("../../config/database");

exports.authService = async (deviceId) => {
    try {
        const user = await prisma.user.upsert({
            where: { deviceId: deviceId },
            update: {},
            create: {
                username: `user_${Date.now()}`,
                fullName: `user_${Date.now()}`,
                deviceId: deviceId,
            }
        });

        const token = await getToken(user["id"]);
        return {user, token};
    } catch (error) {
        throw new CustomError(error.message);
    }
}