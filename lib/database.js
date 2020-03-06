/*!
 * pulse-monitor
 * Copyright(c) 
 * MIT Licensed
 */

'use strict';

const MongoDB = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const debug = require('debug')('pulse-monitor');

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME || '';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const MONGO_DB = process.env.MONGO_DB || '';

class PulseData {
    constructor(databaseURL) {
        this.databaseURL = databaseURL || process.env.DATABASE_URL;
        this.databaseClient = null;
        this.defaults = {
            pageSize: 5
        };

        this.connect(this.databaseURL);
    }

    getConnectionString () {
        return `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}/test?useUnifiedTopology=true&retryWrites=true&w=majority`;
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

app.getConnectionString = pulseData.getConnectionString;
app.connect = pulseData.connect;
app.disconnect = pulseData.disconnect;
app.query = pulseData.query;
app.insert = pulseData.insert;
app.delete = pulseData.delete;
app.convertId = pulseData.convertId;
