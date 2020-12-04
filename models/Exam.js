const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
    code:{type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    instruction: {type:String},
    title: {type: String, required: true},
    questions: [{type: Schema.Types.ObjectId, ref: 'Question'}],
    status: {type: String, enum:["unactivated","activated","deactivated"],default: "unactivated"},
    timeLimit: {type: Number, required: true},
    students: [{type: Schema.Types.ObjectId, ref: "User", default: null}],
    examSpan: {type: Number, default: null},
    expireDate: {type: Date, default: null},
    createdAt: {type: Date, default: new Date()},
    deletedAt: {type: Date, default: null}
});

const ExamModel = mongoose.model('Exam', ExamSchema);
module.exports = ExamModel;
