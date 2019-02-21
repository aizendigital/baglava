
'use strict';

const assert = require('assert');
const sinon = require('sinon');
const User = require('./user');
const mysqlInterface = require('../../test/mysql2TestInterface')


describe('User model methods', async () => {
    let mysqlMock;
    let user;
    before(() => {
        user = new User(mysqlInterface);

    });
    beforeEach(() => {
        mysqlMock = sinon.mock(mysqlInterface);

    });

    afterEach(() => {
        mysqlMock.restore();
    });
    
    describe('#.fastRegister', () => {

        const valid = [
            {
                query: 'INSERT INTO user(email, company_id, active) VALUES(?,?,?)', values: ['a@a.com',
                    '1', false],
                input: { email: 'a@a.com', companyId: '1', active: false }
            },
            // { query: 'INSERT INTO user(email, password) VALUES(?,?)', values: [email, hashedPassword], input: [email, password] },
        ];
        for (let i = 0; i < valid.length; i++) {
            it('#fastRegister ' + JSON.stringify(valid[i].input), (done) => {
                mysqlMock
                    .expects('query')
                    .withArgs(valid[i].query, valid[i].values)
                    .resolves([{ insertId: 11 }, null])
                    ;
                user.fastRegister(valid[i].input.email, valid[i].input.companyId, valid[i].input.active);
                mysqlMock.verify();
                done();
            });
        }

        const invalid = [
            {
                query: 'INSERT INTO user(email, company_id, active) VALUES(?,?,?)', values: ['a@a.com',
                    '1', false],
                input: { email: 'a@a.com', companyId: '', active: false }
            },
            // { query: 'INSERT INTO user(email, password) VALUES(?,?)', values: [email, hashedPassword], input: [email, password] },
        ];
        for (let i = 0; i < invalid.length; i++) {
            it('#fastRegister ' + JSON.stringify(invalid[i].input), (done) => {
                mysqlMock
                    .expects('query')
                    .withArgs(invalid[i].query, invalid[i].values)
                    .never()
                    ;
                user.fastRegister(invalid[i].input.email, invalid[i].input.companyId, invalid[i].input.active);
                mysqlMock.verify();
                done();
            });
        }

    });

});

