
'use strict';

const config = require('../../config/config.js');
const mysql = require('promise-mysql');


module.exports = async function () {
    await mysql.createConnection({
        host: config.mysqlHost,
        user: config.mysqlUser,
        password: config.mysqlPassword,
        database: config.mysqlDatabase
    }).then(() => {
        console.log('mysql connected!');
    })
    .catch(err => {
        console.log('mysql connection error',err);
    });
};
