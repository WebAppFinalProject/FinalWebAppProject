const router = require('express').Router();
const QuizZoneController = require('../controllers/QuizZoneController');
const AUTH = require('../middlewares/Authorization');

router.post('/add/question', AUTH.authorizedRequest,QuizZoneController.addQuestion);
router.post('/add/exam', AUTH.authorizedRequest, QuizZoneController.addExam);
router.get('/get/exam/:author', AUTH.authorizedRequest,QuizZoneController.getExamsByauthor);
router.get('/get/exam/:status/:id', AUTH.authorizedRequest, QuizZoneController.getActiveExamsByStatusAndId);
router.get('/get/exam/v2/:code/:status',AUTH.authorizedRequest ,QuizZoneController.getActiveExamByStatusAndCode);
router.put('/put/exam/:id', AUTH.authorizedRequest, QuizZoneController.updateExamById);

//this will get the exam by id
router.get('/exam/:id', AUTH.authorizedRequest, QuizZoneController.getExamById);

module.exports = router;