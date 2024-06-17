const validate = require("../utils/validate");
const profileValidate = {
    GetRestaurant: validate(['id']),
    Review: validate(['restaurantId', 'content']),
}
module.exports = profileValidate;