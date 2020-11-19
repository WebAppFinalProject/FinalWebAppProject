const mongoose = require('mongoose');
const {dbUri} = require('../config/config');
const connectToMongoose = () => {
    mongoose
        .connect(dbUri, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(()=> console.log("Connected to MongoDb Atlas"))
            .catch((error)=> console.log("Error:",error));
}

module.exports = connectToMongoose;