
'use strict';

const Router = require('koa-router');
const router = new Router();
const PageController = require('./controller/page');

let pageController = new PageController();

router.get('/api/v1/page/:slug', pageController.getPage);

module.exports = router;
