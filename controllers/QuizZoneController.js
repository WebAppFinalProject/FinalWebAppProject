//import the models
const Exam = require('../models/Exam');
const Question = require('../models/Question');


module.exports = {
    //add exam
    addExam: async (req, res) =>{
        const newExam = req.body;
        try {
            const toAddExam = new Exam(newExam);
            const newlyAddedExam = await toAddExam.save();

            if(!newlyAddedExam) return res.status(400).json({message: "Something went wrong!"});

            res.json({message: "Successfully added",url: "/dashboard", examId: newlyAddedExam._id});
        } catch (error) {
            res.status(500).json({message: error, error: true});
        }    
    },
    // add question
    addQuestion: async (req, res) =>{
        const newQuestion = req.body;
        console.log(newQuestion);
        try {
            const toAddQuestion = new Question(newQuestion);
            const newlyAddedQuestion = await toAddQuestion.save();

            if(!newlyAddedQuestion) return res.status(400).json({message: "Something went wrong!"});

            res.json({message: "Successfully added", questionId: newlyAddedQuestion._id});
        } catch (error) {
            res.status(500).json({message: error, error: true});
        } 
    },

    //get exam
    getAllExam: async(req, res) => {
        try {
            const Exams = await Exam.find();
            if(!Exams) return res.status(400).json({message: "Something went wrong!"});

            res.json({message: "Successfully retrieve", exams: Exams});
        } catch (error) {
            res.status(500).json({message: error, error: true});
        }
    },

    //get all questions
    getAllQuestion: async (req, res)=> {
        try {
            const Questions = await Question.find();
            if(!Questions) return res.status(400).json({message: "Something went wrong!"});

            res.json({message: "Successfully retrieve", questions: Questions});
        } catch (error) {
            res.status(500).json({message: error, error: true});
        }
    },
    
    //get exams by author 
    getExamsByauthor: async (req, res) => {
        const author = req.params.author;
        try {
            const Exams = await Exam.find({author: author});
            if(!author) return res.status(400).json({message: "Something went wrong!"});

            res.json({message: "Successfully retrieved!", exams: Exams});
        } catch (error) {
            res.status(500).json({message: error, error: true});
        }
    }

}