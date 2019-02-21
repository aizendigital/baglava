
'use strict';

const assert = require('assert');
const sinon = require('sinon');
const User = require('./user');

const bcryptInterface = require('../../test/bcryptInterface')
const mysqlInterface = require('../../test/mysql2TestInterface')


describe('User model methods', async () => {


    let mysqlMock;
    let user;
    let bcryptMock;
    before(() => {
        user = new User(mysqlInterface);

    });
    beforeEach(() => {
        mysqlMock = sinon.mock(mysqlInterface);
        bcryptMock = sinon.mock(bcryptInterface);
    });

    afterEach(() => {
        mysqlMock.restore();
    });


    // describe('#.checkPassword', () => {

    //     const queryValues = [
    //         { query: 'INSERT INTO company(name) VALUES(?)', values: ["NAME"], input: "NAME" },
    //         { query: 'INSERT INTO company(name) VALUES(?)', values: ["نام"], input: "نام" },
    //         // { query: 'INSERT INTO company(name) VALUES(?)', values: null, input: null },
    //         { query: 'INSERT INTO company(name) VALUES(?)', values: [""], input: "" },

    //     ];
    //     for (let i = 0; i < queryValues.length; i++) {
    //         it('#checkPassword ' + queryValues[i].input, (done) => {
    //             mysqlMock
    //                 .expects('query')
    //                 .withArgs(queryValues[i].query, queryValues[i].values)
    //                 .resolves([{ insertId: 11 }, null])
    //                 ;
    //             company.createCompany(queryValues[i].input);
    //             mysqlMock.verify();
    //             done();
    //         });
    //     }
    // });



    it('#createUser', (done) => {
        // mysqlMock
        //     .expects('query')
        //     .withArgs('INSERT INTO user(email, password) VALUES(?,?)',
        //     ['email', 'hashedPassword'])
        //     .resolves([{ insertId: 11 }, null])
        //     ;
        // bcryptMock
        //     .expects('hashSync')
        //     .withArgs('password', 10)
        //     ;
        // user.createUser('email', 'password');
        // mysqlMock.verify();
        // bcryptMock.verify();

        done();
    });

    it('#createCompany', (done) => {

        done();
    });
});

