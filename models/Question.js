const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {type: String, required: true},
    type: {type: String, enum: ["multiplechoice","trueorfalse","identification"], required: true},
    points: {type: Number, default: 1},
    answerKey: {type: String, required: true},
    choices: [{type: Object}],
    createdAt: {type: Date, default: new Date()},
    deletedAt: {type: Date, default: null} 
});

const QuestionModel = mongoose.model('Question', QuestionSchema);

module.exports = QuestionModel;