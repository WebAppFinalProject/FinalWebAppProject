const router = require('express').Router();
const AccountController = require('../controller/AccountController');
const AUTH = require('../../../middlewares/Authorization');

router.post('/signup', AccountController.addUser);
router.post('/signin', AccountController.userDologin);
router.get('/getuser/:id', AccountController.getUser);


module.exports = router;