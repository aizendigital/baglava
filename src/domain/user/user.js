
'use strict';

const bcrypt = require('bcrypt');


class User {


    constructor(connection) {
        this.connection = connection;
    }

    async createUser({ email, password }) {
        let hashedPassword = bcrypt.hashSync(password, 10);//TODO salt
        let createdAt = new Date();
        let updatedAt = new Date();
        let [rows, fields] = await this.connection.query('INSERT INTO user(email, password) VALUES(?,?)',
            [email, hashedPassword, createdAt, updatedAt]);

        return rows.insertId;
    }

    async fastRegister(email, companyId) {
        let [rows, fields] = await this.connection.query('INSERT INTO user(email, company_id, active) VALUES(?,?,?)',
            [email, companyId, false, new Date(), new Date()]);
        return rows.insertId;
    }

    async checkExistUserByEmail(email) {
        const [rows, fields] = await this.connection.query('SELECT * FROM user WHERE email = ?', [email]);
        return rows[0];
    }

    async getUserByEmail(email, columns) {
        columns = columns ? columns : '*';
        const [rows, fields] =
            await this.connection.query('SELECT ?? FROM user WHERE email = ?', [columns, email]);

        return rows[0];
    }

    async checkPassword(password, user) {
        return bcrypt.compareSync(password, user.password);
    }

    async getUserById(email, columns) {
        columns = columns ? columns : '*';
        const [rows, fields] = await this.connection.query('SELECT ?? FROM USER WHERE ID = ?', [columns, email]);
        return rows[0];
    }


    async updateUser(userData) {

    }
}


module.exports = User;
