const validate = require("../utils/validate");
const authValidate = {
    Login: validate(['username', 'password']),
    Register: validate(['fullname', 'username', 'birthDate', 'gender', 'password', 'repeat_password']),
}
module.exports = authValidate;