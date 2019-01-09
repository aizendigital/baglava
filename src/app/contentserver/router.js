
'use strict';

const Router = require('koa-router');
const router = new Router();
const PageController = require('./controller/page');
const JobController = require('./controller/job');
const CompanyController = require('./controller/company');


let pageController = new PageController();
let jobController = new JobController();
let companyController = new CompanyController();


router.get('/api/v1/page/:slug', pageController.getPage);
router.get('/api/v1/jobs/', jobController.getJobs);
router.post('/api/v1/jobs/', jobController.createJob);
router.get('/api/v1/jobs/:companySlug/:jobSlug', jobController.getJobProfile);
router.put('/api/v1/jobs/:companySlug/:jobSlug', jobController.updateJob);
router.delete('/api/v1/jobs/:companySlug/:jobSlug', jobController.deleteJob);

router.post('/api/v1/companies', companyController.createCompany);





module.exports = router;
