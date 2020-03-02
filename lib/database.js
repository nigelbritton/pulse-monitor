/*!
 * pulse-monitor
 * Copyright(c) 
 * MIT Licensed
 */

'use strict';

const MongoDB = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const debug = require('debug')('pulse-monitor');

class PulseData {
    constructor(databaseURL) {
        this.databaseURL = databaseURL || process.env.DATABASE_URL;
        this.databaseClient = null;
        this.defaults = {
            pageSize: 5
        };

        this.connect(this.databaseURL);
    }

    connect(databaseURL) {
        const _self = this;

        if (databaseURL == null) { return; }
        if (databaseURL == '') { return; }

        return new Promise((resolve, reject) => {
            MongoClient.connect(databaseURL, { useNewUrlParser: true }, (err, dbClient) => {
                if (err) {
                    debug(err);
                    reject(err);
                } else {
                    _self.databaseClient = dbClient;
                    resolve(dbClient);
                }
            });
        });
    }

    disconnect() {
        let _self = this;

        if (_self.databaseClient) {
            _self.databaseClient.close();
        }
    }

    query(collectionTable, query, page) {
        return new Promise((resolve, reject) => {
            let pageSize = page;
            let mongoDatabase = null;
            if (this.databaseClient) {
                mongoDatabase = this.databaseClient.db('pulse-app');
                mongoDatabase.collection(collectionTable).find(query).limit(pageSize).toArray(function (err, result) {
                    if (err) reject(err);
                    resolve(result);
                });
            } else {
                reject(false);
            }
        });
    }

    insert(collectionTable, data) {
        let mongoDatabase = null;
        if (this.databaseClient) {
            mongoDatabase = this.databaseClient.db('pulse-app');
            if (Array.isArray(data)) {
                mongoDatabase.collection(collectionTable).insertMany(data)
                    .then(function (results) {
                        debug('Document added: ' + new Date().getTime());
                    }, function (err) {
                        debug("Insert failed: " + err.message);
                    });
            } else {
                mongoDatabase.collection(collectionTable).insertOne(data)
                    .then(function (result) {
                        debug('Document added: ' + new Date().getTime());
                    }, function (err) {
                        debug("Insert failed: " + err.message);
                    });
            }
        }
    }

    delete(collectionTable, query) {
        let mongoDatabase = null;
        if (this.databaseClient) {
            mongoDatabase = this.databaseClient.db('pulse-app');
            mongoDatabase.collection(collectionTable).deleteOne(query)
                .then(function (obj) {
                    if (obj.deletedCount >= 1) {
                        debug('Document deleted: ' + new Date().getTime());
                    } else {
                        debug('Document not found: ' + new Date().getTime());
                    }
                }, function (err) {
                    debug("Delete failed: " + err.message);
                });
        }
    }

    convertId(objectId) {
        return new MongoDB.ObjectID(objectId);
    }
}

var pulseData = new PulseData();

var app = exports = module.exports = {};

app.connect = pulseData.connect;
app.disconnect = pulseData.disconnect;
app.query = pulseData.query;
app.insert = pulseData.insert;
app.delete = pulseData.delete;
app.convertId = pulseData.convertId;
