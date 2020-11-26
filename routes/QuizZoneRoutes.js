const router = require('express').Router();
const QuizZoneController = require('../controllers/QuizZoneController');
const AUTH = require('../middlewares/Authorization');

router.post('/add/question', AUTH.authorizedRequest,QuizZoneController.addQuestion);
router.post('/add/exam', AUTH.authorizedRequest, QuizZoneController.addExam);

//test
router.get('/get/exam/:author', QuizZoneController.getExamsByauthor);
module.exports = router;