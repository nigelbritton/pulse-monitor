/*!
 * pulse-monitor
 * Copyright(c) 
 * MIT Licensed
 */

'use strict';

const debug = require('debug')('pulse-monitor');
const request = require('request');

var pulseAccount = require('./account');
var pulseProfile = require('./profile');

var app = {};

app.init = function () {
    var _self = this;

    this.cache = {};
    this.engines = {};
    this.settings = {};
    this.profileList = {};
    this.profileQueue = [];
    this.processQueueStatus = {
        status: 'STOPPED',
        interval: 0
    };
    this.buildQueueStatus = {
        status: 'STOPPED',
        interval: 0
    };

    debug(`pulse-monitor started`);
    debug(`pulse-monitor queue initialized`);

    this.processQueueStatus.interval = setInterval(function () {
        _self.processQueue();
    }, 1000);

    this.buildQueueStatus.interval = setInterval(function () {
        _self.buildQueue();
    }, 1000);
};

app.processQueue = function () {
    var _self = this;

    if (this.processQueueStatus.status != 'RUNNING') { return false; }
    if (this.profileQueue.length == 0) { return false; }

    this.lockQueue();

    while (this.profileQueue.length > 0) {
        var profile = this.profileQueue.shift();
        this.processProfile(profile);
    }

    this.startQueue();
};

app.processProfile = function (profile) {
    var currentTime = new Date().getTime();
    var requestProfile = {
        method: profile.method,
        url: profile.url,
        time: true,
    };

    debug(requestProfile);

    if (this.profileList[profile.id]) {
        this.profileList[profile.id].schedule.updated = currentTime + (60 * profile.schedule.interval * 1000);
        this.profileList[profile.id].schedule.inQueue = false;
    }

    request(requestProfile, function (error, response, body) {
        if (error) {
            // debug(error);
            debug(`${profile.id}: ENOTFOUND`);
            return;
        }
        debug(`${profile.id}: ${response.elapsedTime}ms`);
    });
};

app.buildQueue = function () {
    var _self = this;
    var currentTime = new Date().getTime();

    // fetch from db?

    Object.keys(this.profileList).forEach(function (key) {
        if (_self.profileList[key].status == 'publish') {
            if (_self.profileList[key].schedule.inQueue === false && _self.profileList[key].schedule.updated <= currentTime) {
                _self.profileList[key].schedule.inQueue = true;
                _self.profileQueue.push(_self.profileList[key]);
            }
        }
    });
};

app.flushQueue = function () {
    this.profileQueue = [];
};

app.startQueue = function () {
    this.processQueueStatus.status = 'RUNNING';
    debug(`pulse-monitor queue status: ${this.processQueueStatus.status}`);
};

app.stopQueue = function () {
    this.processQueueStatus.status = 'STOPPED';
    debug(`pulse-monitor queue status: ${this.processQueueStatus.status}`);
};

app.lockQueue = function () {
    this.processQueueStatus.status = 'LOCKED';
    debug(`pulse-monitor queue status: ${this.processQueueStatus.status}`);
};



app.addAccount = function (options) {
    var account = pulseAccount.createAccount(options);

    if (!account) {
        return false;
    }

    return account;
};

app.updateAccount = function (options) {

};

app.deleteAccount = function (options) {

};


app.addProfile = function (options) {
    var profile = pulseProfile.createProfile(options);

    if (!profile) {
        return false;
    }

    this.profileList[profile.id] = profile;
};

app.updateProfile = function (profile) { };

app.deleteProfile = function (profile) { };

module.exports = app;