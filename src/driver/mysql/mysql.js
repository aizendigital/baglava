
'use strict';

const config = require('../../config/config.js');
const mysql = require('mysql2/promise');



module.exports =  function () {
    return mysql.createPool({
        host: config.mysqlHost,
        user: config.mysqlUser,
        password: config.mysqlPassword,
        database: config.mysqlDatabase, 
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
};
