const validate = require("../utils/validate");
const authValidate = {
    Auth: validate(['deviceId']),
}
module.exports = authValidate;