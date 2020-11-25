const router = require('express').Router();
const QuizZoneController = require('../controllers/QuizZoneController');
const AUTH = require('../middlewares/Authorization');
router.post('/add/question', AUTH.authorizedRequest,QuizZoneController.addQuestion);

module.exports = router;