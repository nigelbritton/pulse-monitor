/*!
 * pulse-monitor
 * Copyright(c) 
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var database = require('./database');

var app = exports = module.exports = {};

app.login = function login() {
    return new Promise((resolve, reject) => {
        database.query('pulse-profile', {})
            .then((results) => {
                resolve(results);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

app.register = function register() {
    return false;
};

app.forgottenPassword = function forgottenPassword() {
    return false;
};

app.resetPassword = function resetPassword() {
    return false;
};

