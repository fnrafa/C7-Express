const validate = require("../utils/validate");
const profileValidate = {
    Recommendation: validate(['regionId']),
    RecommendationByType: validate(['regionId', 'typeId']),
}
module.exports = profileValidate;