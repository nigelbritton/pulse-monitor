/*!
 * pulse-monitor
 * Copyright(c) 
 * MIT Licensed
 */

'use strict';

const debug = require('debug')('pulse-monitor');
const request = require('request');

var account = require('./account');
var pulseProfile = require('./profile');
var utils = require('./utils');

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

    debug(`pulse-monitor started`);
    debug(`pulse-monitor queue initialized`);

    this.processQueueStatus.interval = setInterval(function () {
        _self.processQueue();
    }, 5000);
};

app.processQueue = function () {
    var _self = this;

    if (this.processQueueStatus.status != 'RUNNING') { return false; }

    debug(`pulse-monitor queue processing`);

    this.profileQueue.forEach(function (profile) {
        _self.processProfile(profile);
    });

};

app.processProfile = function (profile) {
    var requestProfile = {
        method: profile.method,
        url: profile.url,
        time: true,
    };

    debug(profile);

    // request(requestProfile, function (error, response, body) {
    //     if (error) { return; }
    //     debug(response.headers);
    //     debug(`${response.elapsedTime}ms`);
    // });
};

app.buildQueue = function () {
    var _self = this;
    var profileQueue = [];
    var currentTime = new Date().getTime();

    debug(`pulse-monitor queue building @ ${currentTime}`);

    Object.keys(this.profileList).forEach(function (key) {
        if (_self.profileList[key].status == 'publish') {
            if (_self.profileList[key].schedule.updated <= currentTime) {
                _self.profileList[key].schedule.updated = currentTime + (60 * _self.profileList[key].schedule.interval * 1000);
                profileQueue.push(_self.profileList[key]);
            }
        }
    });

    this.profileQueue = profileQueue;
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