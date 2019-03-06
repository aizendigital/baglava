
'use strict';

const assert = require('assert');
const sinon = require('sinon');
const Company = require('../../domain/company/company');
const mysqlInterface = require('../mysql2TestInterface')


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

        const valid = [
            { query: 'INSERT INTO company(name) VALUES(?)', values: ["NAME"], input: "NAME" },
            { query: 'INSERT INTO company(name) VALUES(?)', values: ["نام"], input: "نام" }

        ];
        for (let i = 0; i < valid.length; i++) {
            it('#createCompany ' + valid[i].input, (done) => {
                mysqlMock
                    .expects('query')
                    .withArgs(valid[i].query, valid[i].values)
                    .resolves([{ insertId: 11 }, null])
                    ;
                company.createCompany(valid[i].input);
                mysqlMock.verify();
                done();
            });
        }

        const invalid = [
            { query: 'INSERT INTO company(name) VALUES(?)', values: null, input: null },
            { query: 'INSERT INTO company(name) VALUES(?)', values: undefined, input: undefined },
            { query: 'INSERT INTO company(name) VALUES(?)', values: [""], input: "" }
        ];
        for (let i = 0; i < invalid.length; i++) {
            it('#createCompany ' + invalid[i].input, (done) => {
                mysqlMock
                    .expects('query')
                    .withArgs(invalid[i].query, invalid[i].values)
                    .never()
                    ;
                company.createCompany(invalid[i].input);
                mysqlMock.verify();
                done();

            });
        }
    });

    describe('#.checkCompanyExistOrOwnerIsActive', () => {

        const valid = [
            { query: 'SELECT c.id FROM company as c LEFT JOIN user as u ON c.id = u.company_id WHERE u.active = true and c.name = ?', values: ["NAME"], input: "NAME" },
            { query: 'SELECT c.id FROM company as c LEFT JOIN user as u ON c.id = u.company_id WHERE u.active = true and c.name = ?', values: ["س"], input: "س" },


        ];
        for (let i = 0; i < valid.length; i++) {
            it('#checkCompanyExistOrOwnerIsActive ' + valid[i].input, (done) => {
                mysqlMock
                    .expects('query')
                    .withArgs(valid[i].query, valid[i].values)
                    .resolves([{ insertId: 11 }, null])
                    ;
                company.checkCompanyExistOrOwnerIsActive(valid[i].input);
                mysqlMock.verify();
                done();
            });
        }

        const invalid = [
            { query: 'SELECT c.id FROM company as c LEFT JOIN user as u ON c.id = u.company_id WHERE u.active = true and c.name = ?', values: [null], input: null },
            { query: 'SELECT c.id FROM company as c LEFT JOIN user as u ON c.id = u.company_id WHERE u.active = true and c.name = ?', values: [""], input: "" },
            { query: 'SELECT c.id FROM company as c LEFT JOIN user as u ON c.id = u.company_id WHERE u.active = true and c.name = ?', values: [undefined], input: undefined }
        ];
        for (let i = 0; i < invalid.length; i++) {
            it('#checkCompanyExistOrOwnerIsActive ' + invalid[i].input, (done) => {
                mysqlMock
                    .expects('query')
                    .withArgs(invalid[i].query, invalid[i].values)
                    .never()
                    ;
                company.checkCompanyExistOrOwnerIsActive(invalid[i].input);
                mysqlMock.verify();
                done();
            });
        }
    });

});

