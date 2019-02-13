const sessionModel = require('../../domain/session/session');
module.exports = function mySQLSessionStore(connection) {
    const session = new sessionModel(connection);

    return {
        set: async function (key, value, maxAge, { rolling, changed }) {
            session.setSession(key, value, maxAge, { rolling, changed });
        },
        get: async function (key, ageMax, { rolling }) {
            session.getSession(key);
        },
        destroy: async function (key) {
            session.deleteSession(key);
        }
    }
}