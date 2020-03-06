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
var utils = require('./utils');

var app = exports = module.exports = {};
var databaseURL = database.getConnectionString();

// database.connect(databaseURL);

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

app.createAccount = function (options) {
    return {
        id: utils.uuidv4(),
        username: options.username || '',
        password: options.password || '',
        status: options.status || 'pending', // pending, active, locked
        update: new Date().getTime(),
    };
};

app.forgottenPassword = function () {
    return false;
};

app.resetPassword = function () {
    return false;
};

