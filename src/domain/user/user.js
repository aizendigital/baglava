
'use strict';

const bcrypt = require('bcrypt');


class User {
    static async createUser({ email, password }) {
        let hashedPassword = bcrypt.hashSync(password, 10);//TODO salt
        let createdAt = new Date();
        let updatedAt = new Date();
        let [rows, fields] = await global.db.query('INSERT INTO USER(email, password, created_at, updated_at) VALUES(?,?,?,?)',
            [ email, hashedPassword, createdAt, updatedAt ]);

        return rows.insertId;
    }

    static async checkExistUserByEmail(email) {
        const [rows, fields] = await global.db.query('SELECT * FROM USER WHERE EMAIL = ?', [email]);
        return rows.length !== 0;
    }

    static async getUserByEmail(email) {
        const [rows, fields] = await global.db.query('SELECT * FROM USER WHERE EMAIL = ?', [email]);
        return rows[0];
    }

    static async checkPassword(user, password){
        return bcrypt.compareSync(password, user.password);
    }

    static async getUserById(email) {
        const [rows, fields] = await global.db.query('SELECT * FROM USER WHERE ID = ?', [email]);
        return rows[0];
    }


    static async updateUser(userData) {

    }
}


module.exports = User;
