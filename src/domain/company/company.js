
'use strict';
const Joi = require('joi');

class Company {
    constructor(connection) {
        this.connection = connection;
    }

    async createCompany(name) {
        let validate = Joi.validate({ name }, { name: Joi.string().required() });
        if (validate.error) return [null, validate.error];

        let error = null;
        let rowsFields = await this.connection.query('INSERT INTO company(name) VALUES(?)',
            [name]).catch((err) => {
                error = err;
            });

        if (error) return [null, error];
        const [rows, fields] = rowsFields;
        return [rows.insertId, error];
    }

    async checkExistCompanyByName(name) {
        let validate = Joi.validate({ name }, { name: Joi.string() });
        if (validate.error) return [null, validate.error];

        const rowsFields = await this.connection.query('SELECT * FROM company WHERE name = ?',
            [name]).catch((err) => {
                error = err;
            });
        if (error) return [null, error];
        const [rows, fields] = rowsFields;
        return [rows[0], error];
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

