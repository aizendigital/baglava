
'use strict';

const Router = require('koa-router');

const router = new Router();
const PageController = require('./controller/page');
const JobController = require('./controller/job');
const CompanyController = require('./controller/company');
const AuthController = require('./controller/auth');


let pageController = new PageController();
let jobController = new JobController();
let companyController = new CompanyController();
let auth = new AuthController();


router.post('/login', auth.login);

router.get('/logout', auth.logout);

router.post('/register', auth.registerUser);

router.post('/fast_register', auth.fastRegister);


router.get('/api/v1/page/:slug', pageController.getPage);
router.get('/api/v1/jobs/', jobController.getJobs);
router.post('/api/v1/jobs/', jobController.createJob);
router.get('/api/v1/jobs/:companySlug/:jobSlug', jobController.getJobProfile);
router.put('/api/v1/jobs/:companySlug/:jobSlug', jobController.updateJob);
router.delete('/api/v1/jobs/:companySlug/:jobSlug', jobController.deleteJob);

router.post('/api/v1/companies', companyController.createCompany);


// TODO : auth.isAuthenticated to protect routes for now!, roll access later
//
// router.get('/public', function (ctx) {
//     ctx.body = 'public route test';
// });


// router.get('/private', auth.isAuthenticated , function (ctx) {
//     ctx.body = 'public route test';
// });



module.exports = router;
