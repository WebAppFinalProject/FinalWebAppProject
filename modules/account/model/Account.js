const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AccountSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    position: {type: String, enum: ["teacher","student"]},
    password: {type: String, required: true},
    createdAt: {type: Date, default: new Date()},
    deletedAt: {type: Date, defalut: null},
    updatedAt: {type: Date, defalut: null}
});

const AccountModel = mongoose.model('User',AccountSchema);
module.exports = AccountModel;