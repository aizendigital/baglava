
'use strict';

const bcrypt = require('bcrypt');
const Joi = require('joi');


class User {


    constructor(connection) {
        this.connection = connection;
    }

    //after activating user

    // async createUser(email, password) {
    //     const { error, value } = Joi.validate({ email, password }, {
    //         email: Joi.string().email().required(),
    //         companyName: Joi.string().min(3).required()
    //     });

    //     if (!email || !password) throw new exception('invalid createUser Input', 'model');
    //     let hashedPassword = bcrypt.hashSync(password, 10);//TODO salt
    //     let [rows, fields] = await this.connection.query('INSERT INTO user(email, password) VALUES(?,?)',
    //         [email, hashedPassword]);

    //     return rows.insertId;
    // }

    async fastRegister(email, companyId) {
        let validate = Joi.validate({ email, companyId }, {
            email: Joi.string().email().required(),
            companyId: Joi.number().required()
        });
        if (validate.error) {
            return [null, validate.error];
        }
        let result, error = null;

        let [rows, fields] = await this.connection.query('INSERT INTO user(email, company_id, active) VALUES(?,?,?)',
            [email, companyId, false]).catch((err) => {
                error = err;
            });
        if (error) return [null, error];
        result = rows.insertId;
        return [result, error];;
    }

    async checkExistUserByEmail(email) {
        let validate = Joi.validate({ email }, {
            email: Joi.string().email().required()
        });
        if (validate.error) {
            return [null, validate.error];
        }
        let result, error = null;


        const [rows, fields] = await this.connection.query('SELECT * FROM user WHERE email = ?',
            [email]).catch((err) => {
                error = err;
            });
        if (error) return [null, error];
        result = rows[0];
        return [result, error];
    }

    async getUserByEmail(email, columns) {
        let validate = Joi.validate({ email, columns }, {
            email: Joi.string().email().required(),
            columns: Joi.array()
        });

        if (validate.error) {
            return [null, validate.error];
        }
        let result, error = null;

        columns = columns ? columns : '*';
        const [rows, fields] =
            await this.connection.query('SELECT ?? FROM user WHERE email = ?',
                [columns, email]).catch((err) => {
                    error = err;
                });

        if (error) return [null, error];
        result = rows[0];
        return [result, error];
    }

    async checkPassword(password, user) {
        let validate = Joi.validate({ password, user }, {
            password: Joi.string().required(),
            user: Joi.object()
                .keys({
                    password: Joi.string().required()
                })
                .required()
        });
        if (validate.error) {
            return [null, validate.error];
        }
        return [bcrypt.compareSync(password, user.password), null];
    }

    async getUserById(email, columns) {
        let validate = Joi.validate({ email, columns }, {
            email: Joi.string().email().required(),
            columns: Joi.array()
        });
        if (validate.error) {
            return [null, validate.error];
        }
        let result, error = null;

        columns = columns ? columns : '*';
        const [rows, fields] = await this.connection.query('SELECT ?? FROM USER WHERE ID = ?',
            [columns, email]).catch((err) => {
                error = err;
            });
        if (error) return [null, error];
        result = rows[0];
        return [result, error];
    }


    // async updateUser(userData) {

    // }
}


module.exports = User;
