const router = require('express').Router();
const Direct = require('../controllers/DirectRoute');

router.get('/',Direct.getIndex);
router.get('/dashboard', Direct.getDashboard);

module.exports = router;