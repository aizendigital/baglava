
'use strict';

const assert = require('assert');
const sinon = require('sinon');
const Company = require('./company');
const mysqlInterface = require('../../test/mysql2TestInterface')


describe('Company model methods', async () => {
    let mysqlMock;
    let company;
    before(() => {
        company = new Company(mysqlInterface);

    });
    beforeEach(() => {
        mysqlMock = sinon.mock(mysqlInterface);

    });

    afterEach(() => {
        mysqlMock.restore();
    });

    describe('#.createCompany', () => {

        const validQueryValues = [
            { query: 'INSERT INTO company(name) VALUES(?)', values: ["NAME"], input: "NAME" },
            { query: 'INSERT INTO company(name) VALUES(?)', values: ["نام"], input: "نام" }

        ];
        for (let i = 0; i < validQueryValues.length; i++) {
            it('#createCompany ' + validQueryValues[i].input, (done) => {
                mysqlMock
                    .expects('query')
                    .withArgs(validQueryValues[i].query, validQueryValues[i].values)
                    .resolves([{ insertId: 11 }, null])
                    ;
                company.createCompany(validQueryValues[i].input);
                mysqlMock.verify();
                done();
            });
        }

        const invalidQueryValues = [
            { query: 'INSERT INTO company(name) VALUES(?)', values: null, input: null },
            { query: 'INSERT INTO company(name) VALUES(?)', values: undefined, input: undefined },
            { query: 'INSERT INTO company(name) VALUES(?)', values: [""], input: "" }
        ];
        for (let i = 0; i < invalidQueryValues.length; i++) {
            it('#createCompany ' + invalidQueryValues[i].input, (done) => {
                mysqlMock
                    .expects('query')
                    .withArgs(invalidQueryValues[i].query, invalidQueryValues[i].values)
                    .throws()
                    ;
                company.createCompany(invalidQueryValues[i].input);
                mysqlMock.verify();
                done();
            });
        }




    });

    describe('#.checkCompanyExistOrOwnerIsActive', () => {

        const queryValues = [
            { query: 'SELECT c.id FROM company as c LEFT JOIN user as u ON c.id = u.company_id WHERE u.active = true and c.name = ?', values: ["NAME"], input: "NAME" },
            { query: 'SELECT c.id FROM company as c LEFT JOIN user as u ON c.id = u.company_id WHERE u.active = true and c.name = ?', values: [""], input: "" },
            { query: 'SELECT c.id FROM company as c LEFT JOIN user as u ON c.id = u.company_id WHERE u.active = true and c.name = ?', values: ["س"], input: "س" },


        ];
        for (let i = 0; i < queryValues.length; i++) {
            it('#checkCompanyExistOrOwnerIsActive ' + queryValues[i].input, (done) => {
                mysqlMock
                    .expects('query')
                    .withArgs(queryValues[i].query, queryValues[i].values)
                    .resolves([{ insertId: 11 }, null])
                    ;
                company.checkCompanyExistOrOwnerIsActive(queryValues[i].input);
                mysqlMock.verify();
                done();
            });
        }
    });

});

