const CustomError = require("../../utils/customError");
const prisma = require("../../config/database");
const {hashPassword} = require("../../utils/hashing");

exports.editProfileService = async (userId, username, fullName, birthDate, gender, password) => {
    try {
        const hashedPassword = await hashPassword(password);
        return await prisma.user.update({
            where: {id: userId},
            data: {
                username,
                fullName,
                gender,
                birthDate,
                password: hashedPassword
            }
        });
    } catch (error) {
        if (error.code === 'P2002') {
            throw new CustomError('Username is already taken');
        }
        throw new CustomError(error.message);
    }
}
