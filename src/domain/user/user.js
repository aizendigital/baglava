
'use strict';

const bcrypt = require('bcrypt');


class User {


    constructor(connection) {
        this.connection = connection;
    }

    async createUser(email, password) {
        if (!email || !password) throw new exception('invalid createUser Input', 'model');

        let hashedPassword = bcrypt.hashSync(password, 10);//TODO salt
        let [rows, fields] = await this.connection.query('INSERT INTO user(email, password) VALUES(?,?)',
            [email, hashedPassword]);

        return rows.insertId;
    }

    async fastRegister(email, companyId) {
        if (!email || !companyId) throw new exception('invalid fastRegister Input', 'model');

        let [rows, fields] = await this.connection.query('INSERT INTO user(email, company_id, active) VALUES(?,?,?)',
            [email, companyId, false]);
        return rows.insertId;
    }

    async checkExistUserByEmail(email) {
        if (!email) throw new exception('invalid email Input', 'model');

        const [rows, fields] = await this.connection.query('SELECT * FROM user WHERE email = ?', [email]);
        return rows[0];
    }

    async getUserByEmail(email, columns) {
        if (!email) throw new exception('invalid getUserById email Input', 'model');
        if (columns != null && !Array.isArray(columns)) throw new exception('invalid getUserById column Input', 'model');
        columns = columns ? columns : '*';
        const [rows, fields] =
            await this.connection.query('SELECT ?? FROM user WHERE email = ?', [columns, email]);

        return rows[0];
    }

    async checkPassword(password, user) {
        if (!user || !password) throw new exception('invalid checkPassword Input', 'model');

        return bcrypt.compareSync(password, user.password);
    }

    async getUserById(email, columns) {
        if (!email) throw new exception('invalid getUserById email Input', 'model');
        if (columns != null && !Array.isArray(columns)) throw new exception('invalid getUserById column Input', 'model');
        columns = columns ? columns : '*';
        const [rows, fields] = await this.connection.query('SELECT ?? FROM USER WHERE ID = ?', [columns, email]);
        return rows[0];
    }


    async updateUser(userData) {

    }
}


module.exports = User;
