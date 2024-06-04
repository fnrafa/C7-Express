const {RequestTimeout} = require("../utils/response");
const timeout = async (req, res, next) => {
    const timeout = 10000;
    const timer = setTimeout(() => {
        RequestTimeout(res)
    }, timeout);
    res.on('finish', () => {
        clearTimeout(timer);
    });
    next();
}
exports.timeout = (app) => {
    app.use(timeout);
}