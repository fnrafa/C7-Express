const prisma = require("../../config/database");
const CustomError = require("../../utils/customError");

exports.getRestaurantDetails = async (id, userId) => {
    try {
        const restaurant = await prisma.restaurant.findUnique({
            where: { id: parseInt(id) },
            include: {
                type: true,
                menus: true,
                reviews: true
            }
        });

        if (!restaurant) new CustomError('Restaurant not found', 404);

        await prisma.history.create({
            data: {
                userId,
                restaurantId: restaurant["id"],
            }
        });

        return restaurant;
    } catch (error) {
        throw new CustomError(error.message || 'Error fetching restaurant details', error.status || 500);
    }
};

exports.addReview = async (restaurantId, content) => {
    try {
        const restaurant = await prisma.restaurant.findUnique({
            where: { id: parseInt(restaurantId) }
        });

        if (!restaurant) new CustomError('Restaurant not found', 404);

        return await prisma.review.create({
            data: {
                content,
                restaurantId: restaurant["id"]
            }
        });
    } catch (error) {
        throw new CustomError(error.message || 'Error adding review', error.status || 500);
    }
};
