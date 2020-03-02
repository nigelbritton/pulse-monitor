/*!
 * pulse-monitor
 * Copyright(c) 
 * MIT Licensed
 */

'use strict';

var Pulse = require('./index');

Pulse.init();
Pulse.addProfile({
    name: 'Example Website',
    url: 'https://www.example.com/',
    status: 'publish',
});
Pulse.buildQueue();
Pulse.startQueue();