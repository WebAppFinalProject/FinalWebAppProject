const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {type: String, required: true},
    type: {type: String, enum: ["multiple choice","true or false","enumeration"], required: true},
    answerKey: [{type: String, required: true}],
    choices: [{type: String}],
    createdAt: {type: Date, default: new Date()},
    deletedAt: {type: Date, default: null} 
});

const QuestionModel = mongoose.model('Question', QuestionSchema);

module.exports = QuestionModel;