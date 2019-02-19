
'use strict';

const assert = require('assert');
const sinon = require('sinon');
const mysql = require('mysql2/promise');
const Company = require('./company');


describe('Page model methods', () => {
    let mysqlMock = sinon.mock(mysql);

    it('#createCompany', (done) => {
        let mysqlConnMock = mysqlMock
        mysqlConnMock
            .expects('query')
            .withArgs('INSERT INTO company(name, created_at, updated_at) VALUES(?,?,?)',["NAME"])
            .resolves([{insertId:7}, null]);
        let company = new Company(mysqlConnMock);
        
        company.createCompany("NAME");
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

