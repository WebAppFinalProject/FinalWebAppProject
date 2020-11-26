const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    title: {type: String, required: true},
    questions: [{type: Schema.Types.ObjectId, ref: 'Question'}],
    status: {type: String, enum:["activates","activated","deactivated"],default: "activates"},
    timeLimit: {type: Number, required: true},
    students: [{type: mongoose.Schema.Types.ObjectId, ref: "User", default: null}],
    expireDate: {type: Date, required: true},
    createdAt: {type: Date, default: new Date()},
    deletedAt: {type: Date, default: null}
});

const ExamModel = mongoose.model('Exam', ExamSchema);
module.exports = ExamModel;