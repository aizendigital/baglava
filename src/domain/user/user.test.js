
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

        // const valid = [
        //     {
        //         query: 'INSERT INTO user(email, active) VALUES(?,?,?)', values: ['a@a.com',
        //             '1', false],
        //         input: { email: 'a@a.com', companyId: '1', active: false }
        //     },
        //     // { query: 'INSERT INTO user(email, password) VALUES(?,?)', values: [email, hashedPassword], input: [email, password] },
        // ];
        // for (let i = 0; i < valid.length; i++) {
        //     it('#fastRegister ' + JSON.stringify(valid[i].input), (done) => {
        //         mysqlMock
        //             .expects('query')
        //             .withArgs(valid[i].query, valid[i].values)
        //             .resolves([{ insertId: 11 }, null])
        //             ;
        //         user.fastRegister(valid[i].input.email, valid[i].input.companyId, valid[i].input.active);
        //         mysqlMock.verify();
        //         done();
        //     });
        // }

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

    describe('#.checkExistUserByEmail', () => {

        const valid = [
            {
                query: 'SELECT * FROM user WHERE email = ?', values: ['a@a.com'],
                input: { email: 'a@a.com' }
            },
            {
                query: 'SELECT * FROM user WHERE email = ?', values: ['a@a'],
                input: { email: 'a@a' }
            }
        ];
        for (let i = 0; i < valid.length; i++) {
            it('#checkExistUserByEmail ' + JSON.stringify(valid[i].input), (done) => {
                mysqlMock
                    .expects('query')
                    .withArgs(valid[i].query, valid[i].values)
                    .resolves([{ insertId: 11 }, null])
                    ;
                user.checkExistUserByEmail(valid[i].input.email);
                mysqlMock.verify();
                done();
            });
        }

        const invalid = [

            {
                query: 'SELECT * FROM user WHERE email = ?', values: [null],
                input: { email: null }
            },
            {
                query: 'SELECT * FROM user WHERE email = ?', values: [''],
                input: { email: '' }
            },
            {
                query: 'SELECT * FROM user WHERE email = ?', values: [undefined],
                input: { email: undefined }
            },

        ];
        for (let i = 0; i < invalid.length; i++) {
            it('#checkExistUserByEmail ' + JSON.stringify(invalid[i].input), (done) => {
                mysqlMock
                    .expects('query')
                    .withArgs(invalid[i].query, invalid[i].values)
                    .never()
                    ;
                user.checkExistUserByEmail(invalid[i].input.email);
                mysqlMock.verify();
                done();
            });
        }

    });

    describe('#.getUserByEmail', () => {

        const valid = [
            {
                query: 'SELECT ?? FROM user WHERE email = ?', values: ['*', 'a@a'],
                input: { email: 'a@a', columns: undefined }
            },
            {
                query: 'SELECT ?? FROM user WHERE email = ?', values: [['id'], 'a@a'],
                input: { email: 'a@a', columns: ['id'] }
            },
            {
                query: 'SELECT ?? FROM user WHERE email = ?', values: [[''], 'a@a'],
                input: { email: 'a@a', columns: [''] }
            }
        ];
        for (let i = 0; i < valid.length; i++) {
            it('#getUserByEmail ' + JSON.stringify(valid[i].input), (done) => {
                mysqlMock
                    .expects('query')
                    .withArgs(valid[i].query, valid[i].values)
                    .resolves([{ insertId: 11 }, null])
                    ;
                user.getUserByEmail(valid[i].input.email, valid[i].input.columns);
                mysqlMock.verify();
                done();
            });
        }

        const invalid = [
            {
                query: 'SELECT ?? FROM user WHERE email = ?', values: ['*', 'a@a'],
                input: { email: 'a@a', columns: '*' }
            },
            {
                query: 'SELECT ?? FROM user WHERE email = ?', values: [null, 'a@a'],
                input: { email: 'a@a', columns: null }
            },
            {
                query: 'SELECT ?? FROM user WHERE email = ?', values: [undefined, 'a@'],
                input: { email: 'a@', columns: undefined }
            }
        ];
        for (let i = 0; i < invalid.length; i++) {
            it('#getUserByEmail ' + JSON.stringify(invalid[i].input), (done) => {
                mysqlMock
                    .expects('query')
                    .withArgs(invalid[i].query, invalid[i].values)
                    .never()
                    ;
                user.getUserByEmail(invalid[i].input.email, invalid[i].input.columns);
                mysqlMock.verify();
                done();
            });
        }

    });


    describe('#.getUserById', () => {

        // const valid = [
        //     {
        //         query: 'SELECT ?? FROM USER WHERE ID = ?', values: ['*', 'a@a'],
        //         input: { email: 'a@a', columns: undefined }
        //     },
        //     {
        //         query: 'SELECT ?? FROM USER WHERE ID = ?', values: [['id'], 'a@a'],
        //         input: { email: 'a@a', columns: ['id'] }
        //     },
        //     {
        //         query: 'SELECT ?? FROM USER WHERE ID = ?', values: [[''], 'a@a'],
        //         input: { email: 'a@a', columns: [''] }
        //     }
        // ];
        // for (let i = 0; i < valid.length; i++) {
        //     it('#getUserById ' + JSON.stringify(valid[i].input), (done) => {
        //         mysqlMock
        //             .expects('query')
        //             .withArgs(valid[i].query, valid[i].values)
        //             .resolves([{ insertId: 11 }, null])
        //             ;
        //         user.getUserById(valid[i].input.email, valid[i].input.columns);
        //         mysqlMock.verify();
        //         done();
        //     });
        // }

        const invalid = [
            {
                query: 'SELECT ?? FROM USER WHERE ID = ?', values: ['*', 'a@a'],
                input: { email: 'a@a', columns: '*' }
            },
            {
                query: 'SELECT ?? FROM USER WHERE ID = ?', values: [null, 'a@a'],
                input: { email: 'a@a', columns: null }
            },
            {
                query: 'SELECT ?? FROM USER WHERE ID = ?', values: [undefined, 'a@'],
                input: { email: 'a@', columns: undefined }
            }
        ];
        for (let i = 0; i < invalid.length; i++) {
            it('#getUserById ' + JSON.stringify(invalid[i].input), (done) => {
                mysqlMock
                    .expects('query')
                    .withArgs(invalid[i].query, invalid[i].values)
                    .never()
                    ;
                user.getUserById(invalid[i].input.email, invalid[i].input.columns);
                mysqlMock.verify();
                done();
            });
        }

    });

});

