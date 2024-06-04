const rateLimit = require("express-rate-limit");
const {TooManyRequests} = require("../utils/response");

const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: true,
    handler: (req, res) => {
        TooManyRequests(res);
    }
});
exports.rateLimits = (app) => {
    app.use(rateLimiter);
}