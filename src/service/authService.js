const CustomError = require("../utils/customError");
const {hash, compare} = require("bcryptjs");
const getToken = require("../utils/jwtToken");
const prisma = require("../config/database");

exports.registerService = async (username, pass, fullName, birthDate, gender) => {
    try {
        const hashedPassword = await hash(pass, 10);
        console.log(hashedPassword);
        const user = await prisma.user.create({
            data: {
                username, password: hashedPassword, fullName, birthDate, gender
            },
        });
        const token = await getToken(user.id);
        return {user, token};
    } catch (error) {
        if (error.code === 'P2002') {
            throw new CustomError("Username already exists", 409);
        } else {
            throw new CustomError(error.message);
        }
    }
}

exports.loginService = async (username, password) => {
    try {
        const user = await prisma.user.findFirstOrThrow({
            where: {username},
        });

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            throw new CustomError("Invalid username or password", 401);
        }

        const token = await getToken(user.id);
        return {user, token};
    } catch (error) {
        if (error.code === 'P2025' || error.code === 'P2016') {
            throw new CustomError("Username not found", 404);
        }
        throw new CustomError(error.message);
    }
}