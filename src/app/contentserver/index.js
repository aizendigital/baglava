#!/usr/bin/env node

'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const path = require('path');
const app = new Koa();
const pino = require('koa-pino-logger')();
const config = require('../../config/config.js');
const router = require('./router.js');
const mysqlDriver = require('../../driver/mysql/mysql');
const passport = require('../../security/passport');
const session = require('koa-session');

global.connectionPool = mysqlDriver(); // put in global to pass to sub-apps
app.use(views(path.join(__dirname, 'views'), { extension: 'html' }));

// sessions
app.keys = ['your-session-secret'];
app.use(session({}, app));


app.use(async (ctx, next) => {
   try {
      await next();
   } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = { data: null, error: err.message , status : false };//TODO centrally error handling
      //  ctx.app.emit('error', err, ctx);
   }
});


// set up MySQL connection
app.use(async function mysqlConnection(ctx, next) {
   try {
      // keep copy of ctx.state.db in global for access from models
      ctx.state.db = global.db = await global.connectionPool.getConnection();
      ctx.state.db.connection.config.namedPlaceholders = true;//TODO refactor
      // traditional mode ensures not null is respected for unsupplied fields, ensures valid JavaScript dates, etc
      // await ctx.state.db.query('SET SESSION sql_mode = "TRADITIONAL"');
      await next();

      ctx.state.db.release();

   } catch (e) {
      // note if getConnection() fails we have no this.state.db, but if anything downstream throws,
      // we need to release the connection
      if (ctx.state.db) ctx.state.db.release();
      throw e;
   }
});

app.use(async function (ctx, next) {
   ctx.flash = function (type, msg) {
      ctx.session.flash = { type: type, message: msg };
   }

   await next();
});



app.use(pino)
   .use(bodyParser())
   .use(passport.initialize())
   .use(passport.session())
   .use(router.routes())
   .use(router.allowedMethods());



app.on('error', (err, ctx) => {
   pino.logger.error(ctx + ':' + err);
});


pino.logger.info('Listening on ' + config.bindAddress + ':' + config.bindPort);

app.listen(config.bindPort, config.bindAddress);
