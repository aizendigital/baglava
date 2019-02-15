const sessionModel = require('../../domain/session/session');
const utilFunctions = require('../../utils/functions');


module.exports = async function (ctx, next) {
    const session = new sessionModel(ctx.state.db);

    const stateId = ctx.cookies.get('state-id')
    if (stateId) {// state Id has been set before
        const stateData = await session.getByStateId(stateId);
        if (stateData) {
            //valid state id
            if (ctx.isAuthenticated()) {
                if (stateData.user_id) {
                    //4 
                    await session.updateLastVisitByStateId(stateId);
                } else {
                    //3 first time authenticated
                    await session.updateUserIdByStateId(stateId, ctx.state.user.id);
                }

                if (!stateData.active) {
                    //invalidate cookie-session user
                    ctx.logout();
                    ctx.redirect('/');
                }
            } else {
                if (!stateData.user_id) {
                    //2
                    // before authentication
                    await session.updateLastVisitByStateId(stateId);
                } else {
                    //5 has been logged out
                    ctx.cookies.set('state-id','');
                    await session.deleteByUserIdAndStateId(stateId);
                }
            }
        } else {
            ctx.cookies.set('state-id','');
            //wrong state id -- manipulated , deleted
            // do nothing 
        }
    } else {//first time visit, no state id
        let data = {ip : ctx.request.ip , agent : ctx.request.header['user-agent'] };
        if (ctx.isAuthenticated()) { // state-id manipulated , we can remove this
            let stateId = utilFunctions.uuid();
            await session.insertNewState(stateId, ctx.state.user.id, data, new Date(), true);
            ctx.cookies.set('state-id', stateId);
        } else {
            let stateId = utilFunctions.uuid();
            await session.insertNewState(stateId, null, data, new Date(), true);//1
            ctx.cookies.set('state-id', stateId);
        }
    }

    await next();
};



