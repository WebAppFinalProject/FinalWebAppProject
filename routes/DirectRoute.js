const router = require('express').Router();
const Direct = require('../controllers/DirectController');

router.get('/',Direct.getIndex);
router.get('/dashboard', Direct.getDashboard);
router.get('/signin', Direct.getSignIn);
router.get('/signup', Direct.getSignUp);

module.exports = router;