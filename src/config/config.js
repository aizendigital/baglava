'use strict';

let cfg = {
    bindAddress: process.env.BIND_ADDRESS ? process.env.BIND_ADDRESS : '127.0.0.1',
    bindPort: process.env.BIND_PORT ? process.env.BIND_PORT : '3000',
    mongoUri: process.env.MONGO_URI ? process.env.MONGO_URI : 'mongodb://localhost/aizen',
    mysqlHost : process.env.MYSQL_HOST ? process.env.MYSQL_HOST : 'localhost',
    mysqlUser : process.env.MYSQL_USER ? process.env.MYSQL_USER : 'root',
    mysqlPassword : process.env.MYSQL_PASSWORD ? process.env.MYSQL_PASSWORD : 'root',
    mysqlDatabase : process.env.MYSQL_DATABASE ? process.env.MYSQL_DATABASE : 'Aizen_db',

};

module.exports = cfg;
