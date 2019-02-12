
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
let auth = new AuthController();

router.get('/', async function (ctx) {
    ctx.body = 'homepage: ' + JSON.stringify(ctx.state.user);//TODO test
});

router.get('/login', auth.getLogin);

router.post('/login', async (ctx) => {
    return passport.authenticate('local', (err, user, info, status) => {
        if (user === false) {
            ctx.throw(401, new Error(info.message));//TODO 
        } else {
            ctx.login(user);
            ctx.redirect('/');
        }
    })(ctx)
});


router.get('/logout', function (ctx) {
    ctx.logout();
    ctx.redirect('/login');
});

router.post('/register', auth.registerUser);



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
