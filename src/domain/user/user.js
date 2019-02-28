
'use strict';

const bcrypt = require('bcrypt');
const Joi = require('joi');
const utils = require('../../utils/functions');
const userValidationSchema = require('./validation');

class User {


    constructor(connection) {
        this.connection = connection;
    }

    async fastRegister(email, password) {
        const validation = Joi.validate({ email, password }, userValidationSchema.fastRegister);
        if (validation.error) return [null, validation.error];

        let error = null;
        const randomToken = utils.uuid() + utils.uuid();
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const hashedPassword = bcrypt.hashSync(password, 10);

        const rowsFields = await this.connection.query('INSERT INTO user(email, password, token, expire_token, active) VALUES(?,?,?,?,?)',
            [email, hashedPassword, randomToken, tomorrow, false]).catch((err) => {
                error = err;
            });
        if (error) return [null, error];

        const [rows, fields] = rowsFields;
        return [rows.insertId, error];
    }

    async checkExistUserByEmail(email) {
        let validate = Joi.validate({ email }, {
            email: Joi.string().email().required()
        });
        if (validate.error) {
            return [null, validate.error];
        }
        let error = null;

        const rowsFields = await this.connection.query('SELECT * FROM user WHERE email = ?',
            [email]).catch((err) => {
                error = err;
            });
        if (error) return [null, error];
        const [rows, fields] = rowsFields;
        return [rows[0], error];
    }

    async getUserByEmail(email, columns) {
        let validate = Joi.validate({ email, columns }, {
            email: Joi.string().email().required(),
            columns: Joi.array()
        });

        if (validate.error) {
            return [null, validate.error];
        }
        let error = null;

        columns = columns ? columns : '*';
        const rowsFields =
            await this.connection.query('SELECT ?? FROM user WHERE email = ?',
                [columns, email]).catch((err) => {
                    error = err;
                });
        if (error) return [null, error];

        const [rows, fields] = rowsFields;

        return [rows[0], error];
    }

    async checkPassword(password, user) {
        let validate = Joi.validate({ password, user }, {
            password: Joi.string().required(),
            user: Joi.object()
                .keys({
                    password: Joi.string().required()
                }).unknown(true)
                .required()
        });
        if (validate.error) {
            return [null, validate.error];
        }
        return [bcrypt.compareSync(password, user.password), null];
    }

    async getUserById(id, columns) {
        let validate = Joi.validate({ id, columns }, {
            id: Joi.number().required(),
            columns: Joi.array()
        });
        if (validate.error) {
            return [null, validate.error];
        }
        let error = null;

        columns = columns ? columns : '*';
        const rowsFields = await this.connection.query('SELECT ?? FROM user WHERE ID = ?',
            [columns, id]).catch((err) => {
                error = err;
            });
        if (error) return [null, error];
        const [rows, fields] = rowsFields;

        return [rows[0], error];
    }

    async checkValidTokenExist(token) {

        let validate = Joi.validate({ token }, {
            token: Joi.string().required()
        });
        if (validate.error) {
            return [null, validate.error];
        }

        let error = null;

        const rowsFields = await this.connection.query('SELECT id FROM user WHERE token = ? and expire_token > ?',
            [token, new Date()]).catch((err) => {
                error = err;
            });
        if (error) return [null, error];
        const [rows, fields] = rowsFields;
        return [rows[0], error];
    }

    async expireTokenAndActivate(userId, token) {
        let validate = Joi.validate({ userId, token }, {
            userId: Joi.number(),
            token: Joi.string().required()
        });

        if (validate.error) {
            return [null, validate.error];
        }
        let error = null;

        const rowsFields = await this.connection.query('UPDATE user SET token = ?, expire_token = ? , active = ?  WHERE id = ?',
            [null, new Date(), true, userId]).catch((err) => {
                error = err;
            });

        if (error) return [null, error];
        const [rows, fields] = rowsFields;
        return [rows[0], error];
    }

    // async updateUser(userData) {

    // }

    async resetToken(userId) {
        let validate = Joi.validate({ userId }, {
            userId: Joi.number()
        });
        if (validate.error) {
            return [null, validate.error];
        }
        let error = null;

        let randomToken = utils.uuid() + utils.uuid();
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const rowsFields = await this.connection.query('UPDATE user set token = ?, expire_token = ?  WHERE id = ?',
            [randomToken, tomorrow, userId]).catch((err) => {
                error = err;
            });
        if (error) return [null, error];
        const [rows, fields] = rowsFields;
        return [rows[0], error];
    }

    async restPassword(email, password) {
        let validate = Joi.validate({ email, password }, {
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        });
        if (validate.error) {
            return [null, validate.error];
        }
        let error = null;

        const hashedPassword = bcrypt.hashSync(password, 10);

        const rowsFields = await this.connection.query('UPDATE user SET password = ? WHERE email = ?',
            [hashedPassword, email]).catch((err) => {
                error = err;
            });
        if (error) return [null, error];
        const [rows, fields] = rowsFields;
        return [rows[0], error];
    }

    async isUserActive(userId) {
        let validate = Joi.validate({ userId }, {
            userId: Joi.number(),
        });
        if (validate.error) {
            return [null, validate.error];
        }
        let error = null;

        const rowsFields = await this.connection.query('SELECT id FROM user WHERE active = 1 and id =  ?',
            [userId]).catch((err) => {
                error = err;
            });
        if (error) return [null, error];
        const [rows, fields] = rowsFields;
        return [rows[0], error];
    }
}


module.exports = User;
