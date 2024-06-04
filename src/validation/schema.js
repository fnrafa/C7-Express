const Joi = require('joi');
const field = {
    fullname: Joi.string().min(4).max(56).required(),
    password: Joi.string().min(8).max(15).required(),
    birthDate: Joi.date().required(),
    repeat_password: Joi.string().equal(Joi.ref('password')).required(),
    username: Joi.string().min(4).max(12).required(),
    gender: Joi.string().valid('male', 'female').required()
};
module.exports = field;