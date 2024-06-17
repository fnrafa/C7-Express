const { hash, compare } = require('bcryptjs');
const CustomError = require("./customError");

const hashPassword = async (password) => {
    try {
        return await hash(password, 10);
    } catch (error) {
        throw new CustomError('Error hashing password');
    }
};

const verifyPassword = async (password, hashedPassword) => {
    try {
        return await compare(password, hashedPassword);
    } catch (error) {
        throw new CustomError('Error verifying password');
    }
};

module.exports = {
    hashPassword,
    verifyPassword
};
