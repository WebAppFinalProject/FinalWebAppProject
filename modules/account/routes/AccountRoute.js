const router = require('express').Router();
const AccountController = require('../controller/AccountController');

router.post('/signup', AccountController.addUser);
router.post('/signin', AccountController.userDologin);

module.exports = router;