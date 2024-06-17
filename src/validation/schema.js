const Joi = require('joi');
const field = {
    repeat_password: Joi.string().equal(Joi.ref('password')).required(),
    deviceId: Joi.string().required(),
    username: Joi.string().min(4).max(12).required(),
    fullName: Joi.string().min(4).max(56).required(),
    birthDate: Joi.date().required(),
    gender: Joi.string().valid('male', 'female').required(),
    password: Joi.string().min(8).max(15).required(),
    restaurantId: Joi.number().required(),
    regionId: Joi.number().required(),
    typeId: Joi.number().required(),
    content: Joi.string().required(),
    id: Joi.number().required()
};
module.exports = field;