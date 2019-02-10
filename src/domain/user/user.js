
'use strict';

const bcrypt = require('bcrypt');


class User {
    static async createUser({ email, password }) {
        let hashedPassword = bcrypt.hashSync(password, 10);//TODO salt
        let createdAt = new Date();
        let updatedAt = new Date();
        let res = await global.db.query('INSERT INTO USER(email, password, createdAt, updatedAt) VALUES(?,?,?,?',
            { email, hashedPassword, createdAt, updatedAt });

        return res;
    }

    static async updateUser(userData) {

    }
}


module.exports = User;
