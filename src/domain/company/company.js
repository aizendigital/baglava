
'use strict';

class Company {
    constructor(connection) {
        this.connection = connection;
    }

    async  createCompany(companyName) {

        let [rows, fields] = await this.connection.query('INSERT INTO company(name, created_at, updated_at) VALUES(?,?,?)',
            [companyName, new Date(), new Date()]);

        return rows.insertId;
    }

    async checkCompanyExistOrOwnerIsActive(companyName) {

        let [rows, fields] = await this.connection.query('SELECT c.id FROM company as c RIGHT JOIN user as u ON c.id = u.company_id WHERE u.active = true and c.name = ?', [companyName]);
        return rows[0];
    }
}


module.exports = Company;

