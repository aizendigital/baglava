
'use strict';



class Session {

    constructor(connection) {
        this.connection = connection;
    }


    async getByStateId(stateId) {
        const [rows, fields] = await this.connection.query('SELECT * FROM sql_session WHERE state_id = ?', [stateId]);
        return rows[0];
    }


    async updateLastVisitByStateId(stateId) {
        await this.connection.query('UPDATE sql_session SET last_visit = ? WHERE state_id = ? ',
            [new Date(), stateId]);
    }

    async updateUserIdByStateId(stateId, userId) {
        await this.connection.query('UPDATE sql_session SET user_id = ? ,last_visit = ? WHERE state_id = ?',
            [userId, new Date(), stateId]);
    }

    async deleteByUserIdAndStateId(stateId) {
        await this.connection.query('DELETE  FROM sql_session WHERE state_id = ?', [stateId]);
    }

    async insertNewState(stateId, userId, data, lastVisit, active) {
        let [rows, fields] = await this.connection.query('INSERT INTO sql_session(state_id, user_id, data, last_visit, created_at , active) VALUES(?,?,?,?,?,?)'
            , [stateId, userId, JSON.stringify(data), lastVisit, new Date(), active]);
    }


}


module.exports = Session;
