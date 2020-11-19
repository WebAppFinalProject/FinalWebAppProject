const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//get the database connection
const connect = require('./utils/Database');
connect();



app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));