
'use strict';

const assert = require('assert');
const sinon = require('sinon');
const User = require('../../domain/user/user');
const mysqlInterface = require('../mysql2TestInterface')


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


    //Test name, valid input(query, input) , valid behavior , invalid input invalid behavior 

    describe('Valid Inputs', () => {
        const validModelTest = ((name, input, func) => {
            describe(`#${name}`, () => {
                for (let i = 0; i < input.length; i++) {
                    it(`#${name} ` + JSON.stringify(input[i][1]), (done) => {
                        mysqlMock
                            .expects('query')
                            .withArgs(input[i][0], input[i][1])
                            .resolves([{ insertId: 11 }, null])
                            ;
                        func(...input[i][1]);
                        mysqlMock.verify();
                        done();
                    });
                }
            });
        });
        user = new User(mysqlInterface);

        const validExistUser = [[
            'SELECT * FROM user WHERE email = ?',
            ['a@a.com']
        ]];

        validModelTest('check Exist By Email', validExistUser, user.checkExistUserByEmail.bind(user));

    });

    describe('InValid Inputs', () => {
        const inValidModelTest = ((name, input, func) => {
            describe(`#${name}`, () => {
                for (let i = 0; i < input.length; i++) {
                    it(`#${name} ` + JSON.stringify(input[i][1]), (done) => {
                        mysqlMock
                            .expects('query')
                            .withArgs(input[i][0], input[i][1])
                            .never()
                            ;
                        func(...input[i][1]);
                        mysqlMock.verify();
                        done();
                    });
                }
            });
        });
        user = new User(mysqlInterface);

        const inValidExistUser = [
            ['SELECT * FROM user WHERE email = ?', ['']],
            ['SELECT * FROM user WHERE email = ?', [null]],
            ['SELECT * FROM user WHERE email = ?', [undefined]]
        ];

        inValidModelTest('check Exist By Email', inValidExistUser, user.checkExistUserByEmail.bind(user));

        // const inValidGetUserByEmail = [
        //     ['SELECT ?? FROM user WHERE email = ?', ['']],
        //     ['SELECT * FROM user WHERE email = ?', [null]],
        //     ['SELECT * FROM user WHERE email = ?', [undefined]]
        // ];
    });



    // describe('#.getUserByEmail', () => {

    //     const valid = [
    //         {
    //             query: 'SELECT ?? FROM user WHERE email = ?', values: ['*', 'a@a'],
    //             input: { email: 'a@a', columns: undefined }
    //         },
    //         {
    //             query: 'SELECT ?? FROM user WHERE email = ?', values: [['id'], 'a@a'],
    //             input: { email: 'a@a', columns: ['id'] }
    //         },
    //         {
    //             query: 'SELECT ?? FROM user WHERE email = ?', values: [[''], 'a@a'],
    //             input: { email: 'a@a', columns: [''] }
    //         }
    //     ];
    //     for (let i = 0; i < valid.length; i++) {
    //         it('#getUserByEmail ' + JSON.stringify(valid[i].input), (done) => {
    //             mysqlMock
    //                 .expects('query')
    //                 .withArgs(valid[i].query, valid[i].values)
    //                 .resolves([{ insertId: 11 }, null])
    //                 ;
    //             user.getUserByEmail(valid[i].input.email, valid[i].input.columns);
    //             mysqlMock.verify();
    //             done();
    //         });
    //     }

    //     const invalid = [
    //         {
    //             query: 'SELECT ?? FROM user WHERE email = ?', values: ['*', 'a@a'],
    //             input: { email: 'a@a', columns: '*' }
    //         },
    //         {
    //             query: 'SELECT ?? FROM user WHERE email = ?', values: [null, 'a@a'],
    //             input: { email: 'a@a', columns: null }
    //         },
    //         {
    //             query: 'SELECT ?? FROM user WHERE email = ?', values: [undefined, 'a@'],
    //             input: { email: 'a@', columns: undefined }
    //         }
    //     ];
    //     for (let i = 0; i < invalid.length; i++) {
    //         it('#getUserByEmail ' + JSON.stringify(invalid[i].input), (done) => {
    //             mysqlMock
    //                 .expects('query')
    //                 .withArgs(invalid[i].query, invalid[i].values)
    //                 .never()
    //                 ;
    //             user.getUserByEmail(invalid[i].input.email, invalid[i].input.columns);
    //             mysqlMock.verify();
    //             done();
    //         });
    //     }

    // });


    // describe('#.getUserById', () => {

    //     // const valid = [
    //     //     {
    //     //         query: 'SELECT ?? FROM USER WHERE ID = ?', values: ['*', 'a@a'],
    //     //         input: { email: 'a@a', columns: undefined }
    //     //     },
    //     //     {
    //     //         query: 'SELECT ?? FROM USER WHERE ID = ?', values: [['id'], 'a@a'],
    //     //         input: { email: 'a@a', columns: ['id'] }
    //     //     },
    //     //     {
    //     //         query: 'SELECT ?? FROM USER WHERE ID = ?', values: [[''], 'a@a'],
    //     //         input: { email: 'a@a', columns: [''] }
    //     //     }
    //     // ];
    //     // for (let i = 0; i < valid.length; i++) {
    //     //     it('#getUserById ' + JSON.stringify(valid[i].input), (done) => {
    //     //         mysqlMock
    //     //             .expects('query')
    //     //             .withArgs(valid[i].query, valid[i].values)
    //     //             .resolves([{ insertId: 11 }, null])
    //     //             ;
    //     //         user.getUserById(valid[i].input.email, valid[i].input.columns);
    //     //         mysqlMock.verify();
    //     //         done();
    //     //     });
    //     // }

    //     const invalid = [
    //         {
    //             query: 'SELECT ?? FROM USER WHERE ID = ?', values: ['*', 'a@a'],
    //             input: { email: 'a@a', columns: '*' }
    //         },
    //         {
    //             query: 'SELECT ?? FROM USER WHERE ID = ?', values: [null, 'a@a'],
    //             input: { email: 'a@a', columns: null }
    //         },
    //         {
    //             query: 'SELECT ?? FROM USER WHERE ID = ?', values: [undefined, 'a@'],
    //             input: { email: 'a@', columns: undefined }
    //         }
    //     ];
    //     for (let i = 0; i < invalid.length; i++) {
    //         it('#getUserById ' + JSON.stringify(invalid[i].input), (done) => {
    //             mysqlMock
    //                 .expects('query')
    //                 .withArgs(invalid[i].query, invalid[i].values)
    //                 .never()
    //                 ;
    //             user.getUserById(invalid[i].input.email, invalid[i].input.columns);
    //             mysqlMock.verify();
    //             done();
    //         });
    //     }

    // });

});

