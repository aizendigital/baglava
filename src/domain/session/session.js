
'use strict';



class Session {

    constructor(connection) {
        this.connection = connection;
    }

    async setSession(key, value, maxAge) {
        console.log('set sessions input', key, value, maxAge);
        //check exist
        const [rows, fields] = await this.connection.query('SELECT * FROM session WHERE session_key = ?', [key]);
        if (rows.length != 0) {
            //if exist --> get Value, Json value, merge value, update session
            console.log('existing session rows',rows);
            
            let data = JSON.parse(rows[0].data);
            console.log('existing data',data);
            data = Object.assign({}, data, value);
            console.log('updated data',data);

            await this.connection.query('UPDATE session SET data = ? , updated_at = ? , max_age = ? WHERE key = ? ',
                [JSON.stringify(data), new Date(), maxAge, key]);

        } else {
            console.log('new session value',value);

            let [rows, fields] = await this.connection.query('INSERT INTO session(session_key, data, max_age, created_at, updated_at) VALUES(?,?,?,?,?)'
                , [key, JSON.stringify(value), maxAge, new Date(), new Date()]);

        }
    }

    async getSession(key) {
        const [rows, fields] = await this.connection.query('SELECT * FROM session WHERE session_key = ?', [key]);
        let result = rows.length != 0 ? rows[0].data : null;
        console.log('get session result ',result);        
        result = JSON.parse(result);
        console.log('get session data result',result);
        return result;
    }

    async deleteSession(key) {
        await this.connection.query('DELETE  FROM session WHERE session_key = ?', [key]);
    }
}


module.exports = Session;
