const sessionModel = require('../../domain/session/session');
const utilFunctions = require('../../utils/functions');


module.exports = async function (ctx, next) {
    const session = new sessionModel(ctx.state.db);
    if (ctx.session.stateId) {
        await session.updateLastVisitByStateId(ctx.session.stateId);
        const stateData = await session.getByStateId(ctx.session.stateId);
        if (!stateData.user_id && ctx.state.user) {
            //first time authenticated
            await session.updateUserIdByStateId(ctx.session.stateId, ctx.state.user.id);
        }
        if (!stateData.active) {
            //invalidate cookie-session user
            ctx.logout();
            ctx.redirect('/');
        }
    } else {
        let data = { ip: ctx.request.ip, agent: ctx.request.header['user-agent'] };
        let stateId = utilFunctions.uuid();
        await session.insertNewState(stateId, null, data, new Date(), true);//1
        ctx.session.stateId = stateId;
    }
    await next();
};



