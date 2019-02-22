
'use strict';
const exception = require('../../exception/customException');

class Company {
    constructor(connection) {
        this.connection = connection;
    }

    async createCompany(companyName) {
        if (!companyName) return [null, 'invalid company name'];
        let result, error = null;
        let [rows, fields] = await this.connection.query('INSERT INTO company(name) VALUES(?)',
            [companyName]).catch((err) => {
                error = err;
            });
        if (error) return [null, error];
        result = rows.insertId;
        return [result, error];
    }

    async checkCompanyExistOrOwnerIsActive(companyName) {
        if (!companyName) return [null, 'invalid company name'];
        let result, error = null;
        let [rows, fields] = await this.connection.query('SELECT c.id FROM company as c LEFT JOIN user as u ON c.id = u.company_id WHERE u.active = true and c.name = ?'
            , [companyName]).catch((err) => {
                error = err;
            });
        if (error) return [null, error];
        result = rows[0];
        return [result, error];
    }
}


module.exports = Company;

