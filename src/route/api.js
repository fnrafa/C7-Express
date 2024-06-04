const express = require("express");
const responseTime = require('response-time');
const {MethodNotAllowed} = require("../utils/response");
const authRoutes = require('./authRoutes');
exports.route = (app) => {
    app.use(express.json());
    app.use(responseTime());
    app.use('/auth', authRoutes);
    app.use('/*', (req, res) => {
        MethodNotAllowed(res);
    });
}