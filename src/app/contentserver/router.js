
'use strict';

const Router = require('koa-router');
const router = new Router();
const mongoose = require('../../driver/mongo/mongo');
const PageController = require('./controller/page');
const JobController = require('./controller/job');

let pageController = new PageController(mongoose);
let jobController = new JobController(mongoose);

router.get('/api/v1/page/:slug', pageController.getPage);
router.get('/api/v1/jobs/', jobController.getJobs);


module.exports = router;
