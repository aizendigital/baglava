'use strict';
const pino = require('koa-pino-logger')();
const utils = require('../utils');

describe('#Auth Controller', () => {
    let connection = null , server = null;
    before(async () => {
        require('../config')();
        const mysqlDriver = require('../../driver/mysql/mysql');
        connection  = await mysqlDriver().getConnection();
        server = await require('../../app/contentserver/index');
    });
    describe('Fast Registration', () => {

        it('fast register user with valid data', (done) => {
            
            //
            
            done();
        });
    });
});