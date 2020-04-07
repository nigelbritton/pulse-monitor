/*!
 * pulse-monitor
 * Copyright(c) 
 * MIT Licensed
 */

'use strict';

var Pulse = require('./index');
// var database = require('./lib/database');
var utils = require('./lib/utils');

// Pulse.init();
// Pulse.addProfile({
//     name: 'Example Website',
//     url: 'https://www.doesnotexistsurltest.com/',
//     status: 'publish',
// });
// Pulse.buildQueue();
// Pulse.startQueue();

let localProfile = Pulse.addAccount({
    username: 'test@test.com',
    password: 'password'
});

// let token = utils.signProfile(localProfile);
// let decoded = utils.verifyProfile(token);

console.log(localProfile);
// console.log(token + 'xa');
// console.log(decoded);