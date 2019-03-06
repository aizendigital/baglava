'use strict';

const Joi = require('joi');
const jobValidation = require('./validation');

class Job {
    constructor(connection) {
        this.connection = connection;
    }

    async createJob(job) {
        const validation = Joi.validate(job, jobValidation.createJob);
        if (validation.error) return [null, validation.error];

        const rowsFields = await this.connection.query('INSERT INTO job SET ?',
            job).catch((err) => {
                error = err;
            });
        if (error) return [null, error];

        const [rows, fields] = rowsFields;
        return [rows.insertId, error];
    }
}
