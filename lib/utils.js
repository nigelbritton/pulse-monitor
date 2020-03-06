/*!
 * pulse-monitor
 * Copyright(c) 
 * MIT Licensed
 */

var crypto = require('crypto');

'use strict';

var app = {};

app.uuidv4 = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })
};

app.encryptString = function (inputString) {
    var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
    var mystr = mykey.update(inputString, 'utf8', 'hex');
    return mykey.final('hex');
}

app.decryptString = function (inputString) {
    var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
    var mystr = mykey.update(inputString, 'hex', 'utf8');
    return mykey.final('utf8');
}

exports = module.exports = app;