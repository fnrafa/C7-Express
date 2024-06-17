const express = require("express");
const responseTime = require('response-time');
const {MethodNotAllowed} = require("../utils/response");
const authRoutes = require('./authRoutes');
const profileRoutes = require('./profileRoutes');
const recommendationRoutes = require('./recommendationRoutes');
const restaurantRoutes = require('./restaurantRoutes');
const historyRoutes = require('./historyRoutes');

exports.route = (app) => {
    app.use(express.json());
    app.use(responseTime());
    app.use('/auth', authRoutes);
    app.use('/profile', profileRoutes);
    app.use('/recommendation', recommendationRoutes);
    app.use('/restaurant', restaurantRoutes);
    app.use('/history', historyRoutes);
    app.use('/*', (req, res) => {
        MethodNotAllowed(res);
    });
}