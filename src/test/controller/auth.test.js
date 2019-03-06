'use strict';
const utils = require('../utils');
const chai = require('chai')
    , chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('#Auth Controller', () => {
    let connection = null, server = null;
    before(async () => {
        require('../config')();
        const mysqlDriver = require('../../driver/mysql/mysql');
        connection = await mysqlDriver().getConnection();
        server = await require('../../app/contentserver/index');
    });
    describe('Fast Registration', () => {

            // it('fast register user with valid data', async () => {
            //     //
            //     await utils.truncateDb(connection, 'user');
            //     let response = await request(server)
            //         .post('/fast_registration')
            //         .send({
            //             email: 'valid@email.com',
            //             password: 'valid_password',
            //         });


            //     expect(response).to.have.status(200);

            // });
            // it('fast register user with invalid data', async () => {
            //     await utils.truncateDb(connection, 'user');
            //     let response = await request(server)
            //         .post('/fast_registration')
            //         .send({
            //             email: 'valid',
            //             password: 'valid_password',
            //         });


            //     expect(response).not.to.have.status(200);
            // });
    });
});