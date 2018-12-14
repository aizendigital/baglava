
'use strict';

const Router = require('koa-router');
const router = new Router();
const PageController = require('./controller/page');
const JobController = require('./controller/job');

let pageController = new PageController();
let jobController = new JobController();

router.get('/api/v1/page/:slug', pageController.getPage);
router.get('/api/v1/jobs/', jobController.getJobs);


module.exports = router;
