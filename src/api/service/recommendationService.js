const axios = require('axios');
const CustomError = require("../../utils/customError");
const {modelUrl} = require('../../config/variables');
const prisma = require("../../config/database");

const getRecommendations = async (restaurants, regionId) => {
    try {
        const restaurantIds = restaurants.map(restaurant => restaurant.id);

        const response = await axios.post(`${modelUrl}/predict`, {
            restaurantIds, regionId
        });

        const predictions = response.data["predictions"];
        const validRestaurantIds = response.data["valid_restaurant_ids"];

        const recommendations = validRestaurantIds.map((id, index) => {
            const restaurant = restaurants.find(restaurant => restaurant.id === id);
            return {
                ...restaurant, recommendationScore: predictions[index]
            };
        });

        recommendations.sort((a, b) => b.recommendationScore - a.recommendationScore);

        return recommendations.slice(0, 5);
    } catch (error) {
        throw new CustomError(error.message || 'Error fetching recommendations');
    }
};

exports.recommend = async (userInput) => {
    try {
        const restaurants = await prisma.restaurant.findMany({
            include: {
                type: true, menus: true, reviews: true
            }
        });

        return await getRecommendations(restaurants, userInput.regionId);
    } catch (error) {
        throw new CustomError(error.message || 'Error fetching recommendations');
    }
};

exports.recommendByType = async (userInput) => {
    try {
        const {regionId, typeId} = userInput;
        const restaurants = await prisma.restaurant.findMany({
            where: {
                typeId
            }, include: {
                type: true, menus: true, reviews: true
            }
        });

        return await getRecommendations(restaurants, regionId);
    } catch (error) {
        throw new CustomError(error.message || 'Error fetching recommendations');
    }
};
