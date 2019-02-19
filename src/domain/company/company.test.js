
'use strict';

const assert = require('assert');
const sinon = require('sinon');
const Company = require('./company');
const mysqlConection = require('../../driver/mysql/mysql2TestInterface')


describe('Company model methods', async () => {

    let mysqlMock = sinon.mock(mysqlConection);
  //  console.log(mysqlMock);
    it('#createCompany', (done) => {
        mysqlMock
            .expects("query")
            .withArgs('INSERT INTO company(name, created_at, updated_at) VALUES(?,?,?)',["NAME"])
            .resolves([{insertId:7}, null]);
        let company = new Company(mysqlConection);
        
//        console.log(mysqlConnMock);


        company.createCompany("NAME");

        mysqlMock.verify();
        // PageMock
        //     .expects('findOne').withArgs({ slug: 'SLUG' })
        //     .resolves('RESULT');

        // Page.findBySlug('SLUG').then(function(result) {
        //     PageMock.verify();
        //     PageMock.restore();
        //     assert.equal(result, 'RESULT');
        //     done();
        // });
        done();
    });
});

