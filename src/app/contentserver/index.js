#!/usr/bin/env node

'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const pino = require('koa-pino-logger')();
const config = require('../../config/config.js');
const router = require('./router.js');

app.use(async (ctx, next) => {
   try {
     await next();
   } catch (err) {
     ctx.status = err.status || 500;
     ctx.body = {data: null, error: err};
     ctx.app.emit('error', err, ctx);
   }
 });

app.use(pino)
   .use(bodyParser())
   .use(router.routes())
   .use(router.allowedMethods());

app.on('error', (err, ctx) => {
   pino.logger.error(ctx + ":" + err);
});

pino.logger.info("Listening on " + config.bindAddress + ":" + config.bindPort)
app.listen(config.bindPort, config.bindAddress);
