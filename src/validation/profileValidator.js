const validate = require("../utils/validate");
const profileValidate = {
    Edit: validate(['username', 'fullName', 'birthDate', 'gender', 'password']),
}
module.exports = profileValidate;