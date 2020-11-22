const router = require('express').Router();
const Direct = require('../controllers/DirectRoute');

router.get('/',Direct.getIndex);

module.exports = router;