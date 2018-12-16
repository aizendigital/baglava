#!/usr/bin/env node

'use strict';

const Koa = require('koa');

const app = new Koa();
const pino = require('koa-pino-logger')();
const config = require('../../config/config.js');
const router = require('./router.js');



app.use(pino)
   .use(router.routes())
   .use(router.allowedMethods());

pino.logger.info("Listening on " + config.bindAddress + ":" + config.bindPort)
app.listen(config.bindPort, config.bindAddress);
