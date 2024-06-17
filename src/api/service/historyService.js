const prisma = require("../../config/database");
const CustomError = require("../../utils/customError");
exports.getUserHistory = async (userId) => {
    try {
        const history = await prisma.history.findMany({
            where: {userId}, include: {
                restaurant: true
            }, orderBy: {
                accessedAt: 'desc'
            }
        });

        if (!history.length) {
            new CustomError('No history found for this user', 404);
        }

        return history;
    } catch (error) {
        throw new CustomError(error.message || 'Error fetching user history', error.status || 500);
    }
};