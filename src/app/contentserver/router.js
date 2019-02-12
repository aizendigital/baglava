
'use strict';

const Router = require('koa-router');
const passport = require('../../security/passport');

const router = new Router();
const PageController = require('./controller/page');
const JobController = require('./controller/job');
const CompanyController = require('./controller/company');
const AuthController = require('./controller/auth');


let pageController = new PageController();
let jobController = new JobController();
let companyController = new CompanyController();
let authController = new AuthController();

router.get('/', async function (ctx) {
    ctx.body = 'homepage: ' + JSON.stringify(ctx.state.user);
});

router.get('/login', authController.getLogin);

router.post('/login', async (ctx) => {
    return passport.authenticate('local', (err, user, info, status) => {
        if (user === false) {
            // ctx.body = { success: false };
            ctx.throw(401);//TODO 
        } else {
            // ctx.body = { success: true };
            ctx.login(user);
            ctx.redirect('/');
        }
    })(ctx)
});


router.get('/logout', function (ctx) {
    ctx.logout();
    ctx.redirect('/login');
});

router.post('/register', authController.registerUser);



router.get('/api/v1/page/:slug', pageController.getPage);
router.get('/api/v1/jobs/', jobController.getJobs);
router.post('/api/v1/jobs/', jobController.createJob);
router.get('/api/v1/jobs/:companySlug/:jobSlug', jobController.getJobProfile);
router.put('/api/v1/jobs/:companySlug/:jobSlug', jobController.updateJob);
router.delete('/api/v1/jobs/:companySlug/:jobSlug', jobController.deleteJob);

router.post('/api/v1/companies', companyController.createCompany);






module.exports = router;
