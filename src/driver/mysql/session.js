const sessionModel = require('../../domain/session/session');


class mySQLSessionStore {
    constructor(ctx) {
        this.ctx = ctx;
        this.session = new sessionModel(ctx.state.db);
    }
    async set(key, value, maxAge, { changed, rolling }) {
        console.log('set session called', key, value, maxAge, { changed, rolling })
        this.session.setSession(key, value, maxAge);
    }
    async get(key, ageMax, { rolling }) {
        console.log('get session called', key, ageMax, { rolling })
        this.session.getSession(key);
    }

    async destroy(key) {
        console.log('delete session');
        this.session.deleteSession(key);
    }
}


module.exports = mySQLSessionStore;



