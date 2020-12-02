//import the models
const Exam = require('../models/Exam');
const Question = require('../models/Question');
const ExamResult = require('../models/ExamResult');

const requestBodyParser = require('../utils/requestBodyParser');


module.exports = {
    //add exam
    addExam: async (req, res) => {
        const newExam = req.body;
        try {
            const toAddExam = new Exam(newExam);
            const newlyAddedExam = await toAddExam.save();

            if (!newlyAddedExam) return res.status(400).json({ message: "Something went wrong!" });

            res.json({ message: "Successfully added", url: "/dashboard", examId: newlyAddedExam._id });
        } catch (error) {
            res.status(500).json({ message: error, error: true });
        }
    },
    // add question
    addQuestion: async (req, res) => {
        const newQuestion = req.body;
        try {
            const toAddQuestion = new Question(newQuestion);
            const newlyAddedQuestion = await toAddQuestion.save();

            if (!newlyAddedQuestion) return res.status(400).json({ message: "Something went wrong!" });

            res.json({ message: "Successfully added", questionId: newlyAddedQuestion._id });
        } catch (error) {
            res.status(500).json({ message: error, error: true });
        }
    },

    //get exam
    getAllExam: async (req, res) => {
        try {
            const Exams = await Exam.find();
            if (!Exams) return res.status(400).json({ message: "Something went wrong!" });

            res.json({ message: "Successfully retrieve", exams: Exams });
        } catch (error) {
            res.status(500).json({ message: error, error: true });
        }
    },

    //get all questions
    getAllQuestion: async (req, res) => {
        try {
            const Questions = await Question.find();
            if (!Questions) return res.status(400).json({ message: "Something went wrong!" });

            res.json({ message: "Successfully retrieve", questions: Questions });
        } catch (error) {
            res.status(500).json({ message: error, error: true });
        }
    },
    getExamById: async (req, res) => {
        const examId = req.params.id;

        try {
            const exam = await Exam.findById(examId)
                .populate('author')
                .populate('questions');
            if (!exam) return res.status(400).json({ message: "Something went wrong!" });

            res.json({ message: "Successfully retrieved!", exam: exam });
        } catch (error) {
            res.status(500).json({ message: error, error: true });
        }
    },

    //get exams by author 
    getExamsByauthor: async (req, res) => {
        const author = req.params.author;
        try {
            const Exams = await Exam.find({ author: author })
                .populate('author')
                .populate('questions');
            if (!author) return res.status(400).json({ message: "Something went wrong!" });

            res.json({ message: "Successfully retrieved!", exams: Exams });
        } catch (error) {
            res.status(500).json({ message: error, error: true });
        }
    },

    //get exam by id and status
    getActiveExamsByStatusAndId: async (req, res) => {
        const status = req.params.status;
        const userId = req.params.id;
        try {
            const exams = await Exam.find({ author: userId, status: status });
            if (!exams) return res.status(400).json({ message: "Something went wrong!" });
            res.json({ message: "Successfully retrieved!", exams: exams });
        } catch (error) {
            res.status(500).json({ message: error, error: true });
        }
    },

    //get exam by code status and code
    getActiveExamByStatusAndCode: async (req, res) => {
        const status = req.params.status;
        const code = req.params.code;
        try {
            const exam = await Exam.findOne({ code: code, status: status });
            if (!exam) return res.status(400).json({ message: "Something went wrong!", error: true });

            res.json({ exam: exam, message: "Successfully retrieve!" });
        } catch (error) {
            res.status(500).json({ message: error, error: true });
        }
    },

    //get the exam joined by the student
    getStudentJoinedExam: async (req, res) => {
        const studentId = req.params.studentId;
        const status = req.params.status;
        try {
            const exams = await Exam.find({ students: studentId, status: status })
                .populate('author');
            if (!exams) res.status(400).json({ message: "Something went wrong!", error: true });

            res.json({ message: "Successfully retrieved!", exams: exams });
        } catch (error) {
            res.status(500).json({ message: error, error: true });
        }
    },

    //this controller will update the exam
    //by id
    updateExamById: async (req, res) => {
        const id = req.params.id;
        const updates = requestBodyParser(req.body);

        try {
            const updatedExam = await Exam.findByIdAndUpdate(id, { $set: updates }, { new: true });
            if (!updatedExam) return res.status(400).json({ message: "Cannot find the exam!", error: true });

            res.json({ message: "Successfully edited exam!", update: updatedExam });
        } catch (error) {
            res.status(500).json({ message: error, error: true });
        }
    },

    //this controller will delete the exam by id
    deleteExamById: async (req, res) => {
        const id = req.params.id;
        try {
            const deletedExam = await Exam.findByIdAndDelete(id);
            if (!deletedExam) return res.status(400).json({ message: "Something went wrong!" });

            res.json({ message: "Successfully deleted", exam: deletedExam });
        } catch (error) {
            res.status(500).json({ message: error, error: true });
        }
    },


    //add new exam result
    addExamResult: async (req, res) => {
        const newExamResult = req.body;
        try {
            const examResTobAdded = await new ExamResult(newExamResult);
            const newlyAdded = await examResTobAdded.save();
            if (!newlyAdded) return res.status(400).json({ message: "Something went wrong!" });

            res.json({ mesage: "Successfully added!", result: newlyAdded });

        } catch (error) {
            res.status(500).json({ message: error, error: true });
        }
    },

    //get exam results
    getExamResults: async (req, res) => {
        try {
            const examResults = await ExamResult.find();
            if (!examResults) return res.status(400).json({ message: "Something went wrong!" });

            res.json({ message: "Successfully retrieve!", result: examResults });
        } catch (error) {
            res.status(500).json({ message: error, error: true });
        }
    },

    getExamResultByStudent: async (req, res) => {
        const studentId = req.params.studentId;
        try {
            const examResults = await ExamResult.find({ studentId: studentId })
                .populate('studentId')
                .populate('examId');

            if (!examResults) return res.status(400).json({ message: "Something went wrong!" });

            res.json({ message: "Successfullly retrieved!", results: examResults });
        } catch (error) {
            res.status(500).json({ message: error, error: true });
        }
    },

    getExamResultsById: async (req, res) => {
        const id = req.params.id;
        try {
            const examResut = await ExamResult.findById(id)
                .populate('studentId')
                .populate({
                    path: "examId",
                    populate: {
                        path: "questions"
                    }
                });
            if (!examResut) return res.status(400).json({ message: "Something went wrong!" });

            res.json({ message: "Successfully retrieved!", result: examResut });
        } catch (error) {
            res.status(500).json({ message: error, error: true });
        }
    },


    getExamResultByExamId: async (req, res) => {
        const examId = req.params.id;
        try {
            const examResult = await ExamResult.find({examId: examId})
                .populate({
                    path: "examId",
                    populate: {
                        path:"questions",
                    }
                });
            if(!examResult) return res.status(500).send("Something went wrong!");

            res.json({message: "Successfully retrieved!", examResult: examResult});
       } catch (error) {

        }
    }

}