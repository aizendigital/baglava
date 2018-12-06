
'use strict';

const Router = require('koa-router');
const router = new Router();
const mongoose = require('../../driver/mongo/mongo.js');
const PageController = require('./controller/page.js');

var pageController = new PageController(mongoose);

router.get('/api/v1/page/:slug', pageController.getPage);

module.exports = router;
