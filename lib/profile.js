/*!
 * pulse-monitor
 * Copyright(c) 
 * MIT Licensed
 */

'use strict';

var utils = require('./utils');

var app = {};

app.addProfile = function () {
    return false;
};

app.updateProfile = function () {
    return false;
};

app.deleteProfile = function () {
    return false;
};

app.createProfile = function (options) {
    return {
        id: utils.uuidv4(),
        name: options.name || '',
        status: options.status || 'draft',
        update: new Date().getTime(),
        method: 'GET',
        url: options.url || '',
        params: options.params || {},
        headers: options.headers || {},
        schedule: {
            interval: 5, // 5 mins
            updated: 0,
            inQueue: false,
        }
    };
};

module.exports = app;