const router = require('express').Router();
const QuizZoneController = require('../controllers/QuizZoneController');
const AUTH = require('../middlewares/Authorization');

router.post('/add/question', AUTH.authorizedRequest,QuizZoneController.addQuestion);
router.post('/add/exam', AUTH.authorizedRequest, QuizZoneController.addExam);

router.get('/get/exam/:author', AUTH.authorizedRequest,QuizZoneController.getExamsByauthor);
router.get('/get/exam/:status/:id', AUTH.authorizedRequest, QuizZoneController.getActiveExamsByStatusAndId);
router.get('/get/exam/v2/:code/:status',AUTH.authorizedRequest ,QuizZoneController.getActiveExamByStatusAndCode);
//this will get the exam by id
router.get('/exam/:id', AUTH.authorizedRequest, QuizZoneController.getExamById);

//this route will delete the exam
router.delete('/delete/exam/:id', AUTH.authorizedRequest, QuizZoneController.deleteExamById);


//student part
router.get('/get/student/exam/:studentId/:status',AUTH.authorizedRequest, QuizZoneController.getStudentJoinedExam);
router.put('/put/exam/:id', AUTH.authorizedRequest, QuizZoneController.updateExamById);

//student exam result
router.post('/add/exam-result',AUTH.authorizedRequest, QuizZoneController.addExamResult);
router.get('/get/exam-results', AUTH.authorizedRequest, QuizZoneController.getExamResults);
router.get('/get/exam-result/:studentId', AUTH.authorizedRequest, QuizZoneController.getExamResultByStudent);
router.get('/get/exam-result-by/:id', AUTH.authorizedRequest, QuizZoneController.getExamResultsById);

//analytics route
router.get('/get/exam-result/analytics/:id', AUTH.authorizedRequest, QuizZoneController.getExamResultByExamId);

module.exports = router;