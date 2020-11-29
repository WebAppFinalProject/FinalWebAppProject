const mongoose = require('mongoose');
const { schema } = require('./Exam');
const Schema = mongoose.Schema;


const ExamResultSchema = new Schema({
    examId: {type: Schema.Types.ObjectId, ref: 'Exam', required: true},
    sutdentId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    studentScore: {type: Number,required: true},
    studentAnswer: [{type: Array, required: true}],
    createdAt: {type: Date, default: new Date()},
    deletedAt: {type: Date, default: null},
    updatedAt: {type: Date,default: null}
});

//create model 
const  ExamResultModel = mongoose.model("ExamResult", ExamResultSchema);

module.exports = ExamResultModel;