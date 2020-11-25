const router = require('express').Router();
const Direct = require('../controllers/DirectController');
//require authorization
const AUTH = require('../middlewares/Authorization');

router.get('/',Direct.getIndex);
router.get('/dashboard', AUTH.Dashboard,Direct.getDashboard);
router.get('/signin', AUTH.avoidLogin, Direct.getSignIn);
router.get('/signup',AUTH.avoidLogin ,Direct.getSignUp);

module.exports = router;