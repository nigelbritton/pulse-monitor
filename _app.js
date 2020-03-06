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

// console.log(utils.encryptString('948tyn4qw98by98twye984nca0wytb9v0we4y9t8eunyw0e9arnvopaseuybonespobu9pupnboid;l9o5seun[9bn9560bnseby6opes'));
// console.log(utils.decryptString('735e4671e2be68d4aab6e4ef7792e882'));
console.log(utils.encryptString('abc'));
console.log(utils.decryptString('34feb914c099df25794bf9ccb85bea72'));
console.log(Pulse.addAccount({}));