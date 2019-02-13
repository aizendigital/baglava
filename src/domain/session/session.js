
'use strict';



class Session {

    constructor(connection) {
        this.connection = connection;
    }

    async setSession(key, value, maxAge, { rolling, changed }) {

        //check exist
        const [rows, fields] = await connection.query('SELECT * FROM SESSION WHERE key = ?', [key]);
        if (rows.length != 0) {
            //if exist --> get Value, Json value, merge value, update session
            let data = JSON.parse(rows[0].data);
            data = Object.assign({}, data, value);
            await this.connection.query('UPDATE SESSION SET key = ? , data = ? , updated_at = ? , max_age = ? WHERE key = ? ',
                [key, data, new Date(), maxAge, key]);

        } else {
            let [rows, fields] = await this.connection('INSERT INTO USER(key, data, max_age, created_at, updated_at) VALUES(?,?,?,?)'
                , [key, data, maxAge, new Date(), new Date()]);

        }
    }

    async getSession(key, ageMax, { rolling }) {
        const [rows, fields] = await connection.query('SELECT * FROM SESSION WHERE key = ?', [key]);
        return result = rows.length != 0 ? rows[0] : null;
    }

    async deleteSession(key){
        await connection.query('DELETE  FROM SESSION WHERE key = ?', [key]);
    }
}


module.exports = Session;
