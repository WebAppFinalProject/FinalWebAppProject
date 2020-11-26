const router = require('express').Router();
const QuizZoneController = require('../controllers/QuizZoneController');
const AUTH = require('../middlewares/Authorization');

router.post('/add/question', AUTH.authorizedRequest,QuizZoneController.addQuestion);
router.post('/add/exam', AUTH.authorizedRequest, QuizZoneController.addExam);
router.get('/get/exam/:author', AUTH.authorizedRequest,QuizZoneController.getExamsByauthor);
router.get('/get/exam/:status/:id', AUTH.authorizedRequest, QuizZoneController.getActiveExamsByStatusAndId);


module.exports = router;