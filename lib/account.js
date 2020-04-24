/*!
 * pulse-monitor
 * Copyright(c) 
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

const debug = require('debug')('pulse-monitor');

const database = require('./database');
const utils = require('./utils');

var app = {};
var databaseURL = database.getConnectionString();

database.connect(databaseURL);

app.authenticate = function (options) {
    return new Promise((resolve, reject) => {
        if (!options.username || !options.password) {
            return reject(new Error('Pulse.authentication() valiation failed'));
        }
        if (options.username == '') {
            return reject(new Error('Pulse.authentication() valiation failed'));
        }
        if (options.password == '') {
            return reject(new Error('Pulse.authentication() valiation failed'));
        }
        database.query(database.databaseCollections.account, { username: options.username }, { findOne: true })
            .then((result) => {
                if (result) {
                    if (utils.hash(options.password) != result.password) {
                        return resolve(null);
                    }
                }
                resolve(utils.signProfile(result));
            })
            .catch((err) => {
                reject(err);
            });
    });
};

app.createAccount = function (options) {
    let accountObject = {
        // _id: database.getObjectID(),
        username: options.username || '',
        password: utils.hash(options.password) || '',
        status: options.status || 'pending', // pending, active, locked
        update: new Date().getTime(),
    };

    return new Promise((resolve, reject) => {
        database.insert(database.databaseCollections.account, accountObject)
            .then(function (result) {
                resolve(accountObject);
            })
            .catch(function (err) {
                reject(err);
            });
    });
};

app.forgottenPassword = function () {
    return false;
};

app.resetPassword = function () {
    return false;
};

module.exports = app;