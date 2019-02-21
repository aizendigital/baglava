
'use strict';
const exception = require('../../exception/customException');

class Company {
    constructor(connection) {
        this.connection = connection;
    }

    async createCompany(companyName) {
        if(!companyName) throw new exception('invalid company name: ' + companyName , 'model');
        let [rows, fields] = await this.connection.query('INSERT INTO company(name) VALUES(?)',
            [companyName]);

        return rows.insertId;
    }

    async checkCompanyExistOrOwnerIsActive(companyName) {
        if(!companyName) throw new exception('invalid company name: ' + companyName , 'model');

        let [rows, fields] = await this.connection.query('SELECT c.id FROM company as c LEFT JOIN user as u ON c.id = u.company_id WHERE u.active = true and c.name = ?', [companyName]);
        return rows[0];
    }
}


module.exports = Company;

