'use strict';

var cfg = {
    bindAddress: process.env.BIND_ADDRESS ? process.env.BIND_ADDRESS : '127.0.0.1',
    bindPort: process.env.BIND_PORT ? process.env.BIND_PORT : '3000',
};

module.exports = cfg;
