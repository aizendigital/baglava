
'use strict';

const config = require('../../config/config.js');
const mysql = require('promise-mysql');
const pino = require('koa-pino-logger')();


module.exports = async function () {
    await mysql.createConnection({
        host: config.mysqlHost,
        user: config.mysqlUser,
        password: config.mysqlPassword,
        database: config.mysqlDatabase
    }).then(() => {
        pino.logger.info('mysql connected!');
    })
    .catch(err => {
        pino.logger.info('mysql connection error',err);
    });
};
