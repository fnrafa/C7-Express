const service = require("../service/authService");
const errorHandler = require("../utils/errorHandler");
const { Created, Success } = require("../utils/response");

exports.register = async (req, res) => {
    try {
        const { username, fullname, password, birthDate, gender } = req.body;
        const register = await service.registerService(username, password, fullname, birthDate, gender);
        return Created(res, 'User created successfully', register);
    } catch (error) {
        return errorHandler(req, res, error);
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const login = await service.loginService(username, password);
        return Success(res, "Authenticated successfully", login);
    } catch (error) {
        return errorHandler(req, res, error);
    }
}
