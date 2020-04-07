/*!
 * pulse-monitor
 * Copyright(c) 
 * MIT Licensed
 */

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

'use strict';

const cryptoSecretKey = process.env.SECRET_PASSWORD || 'mypassword';

let app = {};

app.uuidv4 = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

app.encryptString = function (inputString) {
    var mykey = crypto.createCipher('aes-128-cbc', cryptoSecretKey);
    var mystr = mykey.update(inputString, 'utf8', 'hex');
    return mykey.final('hex');
};

app.decryptString = function (inputString) {
    var mykey = crypto.createDecipher('aes-128-cbc', cryptoSecretKey);
    var mystr = mykey.update(inputString, 'hex', 'utf8');
    return mykey.final('utf8');
};

app.md5 = function (inputString) {
    return crypto.createHash('md5').update(inputString).digest("hex");
};

app.hash = function (inputString) {
    return this.md5(this.md5(inputString) + cryptoSecretKey);
};

app.signProfile = function (profile) {
    let issuedAt = Math.floor(Date.now() / 1000);
    let jwtOptions = {
        algorithm: 'HS256',
        expiresIn: issuedAt - (60 * 60)
    };

    // let token = jwt.sign({ foo: 'bar' }, 'shhhhh');
    // let privateKey = fs.readFileSync('private.key');
    let secretOrPrivateKey = cryptoSecretKey;
    let package = profile;
    package.iat = issuedAt;

    delete package.password;

    let token = jwt.sign(package, secretOrPrivateKey, jwtOptions);

    return token;
};

app.verifyProfile = function (token) {
    let decoded = jwt.verify(token, cryptoSecretKey);

    return decoded;
};

exports = module.exports = app;