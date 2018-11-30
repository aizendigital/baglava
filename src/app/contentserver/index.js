#!/usr/bin/env node

'use strict';

const Koa = require('koa');
const app = new Koa();
const pino = require('koa-pino-logger')()
const config = require('../../config/config.js')

app.use(pino)

app.use((ctx) => {
    ctx.log.info("Hello");
    ctx.body = 'Hello';
})

pino.logger.info("Listening on " + config.bindAddress + ":" + config.bindPort)
app.listen(config.bindPort, config.bindAddress);
