const mongoose = require('mongoose');
const { schema } = require('./Exam');
const Schema = mongoose.Schema;


const ExamResultSchema = new Schema({
    examId: {type: Schema.Types.ObjectId, ref: 'Exam', required: true},
    studentId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    studentScore: {type: Number,required: true},
    totalScore: {type: Number, required: true},
    studentAnswer: [{type: Object, required: true}],
    createdAt: {type: Date, default: new Date()},
    deletedAt: {type: Date, default: null},
    updatedAt: {type: Date,default: null}
});

//create model 
const  ExamResultModel = mongoose.model("ExamResult", ExamResultSchema);

module.exports = ExamResultModel;