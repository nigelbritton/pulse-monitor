var expect = require('chai').expect;

require('dotenv').config();

var pulse = require('../index');
var pulseDatabase = require('../lib/database');

describe('Pulse library', function () {

    describe('Application', function () {

        it('uuidv4', function () {
            var uuidv4 = pulse.uuidv4();
            expect(uuidv4).to.be.an('string');
        });

    });

    describe('Database', function () {

        before(async () => {
            let connectionString = pulseDatabase.getConnectionString();
            await pulseDatabase.connect(connectionString)
                .then(function (dbClient) {
                })
                .catch(function (err) {
                    // console.error(err);
                    process.exit(1);
                });
        });

        after(async () => {
            await pulseDatabase.disconnect();
        });

        it('getConnectionString', function () {
            let connectionString = pulseDatabase.getConnectionString();
            expect(connectionString).to.be.an('string');
        });

        it('query', function (done) {
            let collection = pulseDatabase.databaseCollections.account;
            pulseDatabase.query(collection, { username: 'test@test.com' })
                .then(function () {
                    done();
                })
                .catch(function () {
                    done();
                })

        });

    });

    describe('Account', function () {

        // it('authenticate', function (done) {
        //     pulse.authenticate({ username: 'test', password: 'test'})
        //         .then(function (result) {
        //             done();
        //         })
        //         .catch(function (err) {
        //             done(err);
        //         });
        // });

        // it('register', function () {
        //     var result = pulse.register();
        //     expect(result).to.be.equal(false);
        // });

        // it('forgottenPassword', function () {
        //     var result = pulse.forgottenPassword();
        //     expect(result).to.be.equal(false);
        // });

        // it('resetPassword', function () {
        //     var result = pulse.resetPassword();
        //     expect(result).to.be.equal(false);
        // });

    });

    describe('API', function () {

        it('uuidv4', function () {
            var uuidv4 = pulse.uuidv4();
            expect(uuidv4).to.be.an('string');
        });

    });

    describe('Utilities', function () {

        it('uuidv4', function () {
            var uuidv4 = pulse.uuidv4();
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