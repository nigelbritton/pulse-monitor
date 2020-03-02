var expect = require('chai').expect;

var Pulse = require('../index');

describe('Pulse library', function () {

    describe('Application', function () {

        it('uuidv4', function () {
            var uuidv4 = Pulse.Utils.uuidv4();
            expect(uuidv4).to.be.an('string');
        });

    });

    describe('Account', function () {

        it('login', function (done) {
            Pulse.Account.login()
                .then(function (result) {
                    done();
                })
                .catch(function (err) {
                    done(err);
                });
        });

        it('register', function () {
            var result = Pulse.Account.register();
            expect(result).to.be.equal(false);
        });

        it('forgottenPassword', function () {
            var result = Pulse.Account.forgottenPassword();
            expect(result).to.be.equal(false);
        });

        it('resetPassword', function () {
            var result = Pulse.Account.resetPassword();
            expect(result).to.be.equal(false);
        });

    });

    describe('API', function () {

        it('uuidv4', function () {
            var uuidv4 = Pulse.Utils.uuidv4();
            expect(uuidv4).to.be.an('string');
        });

    });

    describe('Utilities', function () {

        it('uuidv4', function () {
            var uuidv4 = Pulse.Utils.uuidv4();
            expect(uuidv4).to.be.an('string');
        });

    });

});

// describe('Status and content', function() {
//     describe ('Main page', function() {
//         it('status', function(done){
//             request('http://localhost:8080/', function(error, response, body) {
//                 expect(response.statusCode).to.equal(200);
//                 done();
//             });
//         });

//         it('content', function(done) {
//             request('http://localhost:8080/' , function(error, response, body) {
//                 expect(body).to.equal('Hello World');
//                 done();
//             });
//         });
//     });

//     describe ('About page', function() {
//         it('status', function(done){
//             request('http://localhost:8080/about', function(error, response, body) {
//                 expect(response.statusCode).to.equal(404);
//                 done();
//             });
//         });

//     });
// });