const express = require('express');
const {port} = require("./src/config/variables");
const {corsMiddleware} = require("./src/middleware/cors");
const {rateLimits} = require("./src/middleware/limiter");
const {timeout} = require("./src/middleware/timeout");
const {route} = require("./src/route/api");
const app = express();

corsMiddleware(app);
rateLimits(app);
timeout(app);
route(app);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});