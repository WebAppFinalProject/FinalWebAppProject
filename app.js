const express = require('express');
const app = express();
const expressEjsLayout = require('express-ejs-layouts');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


//use a logger middleware
app.use(logger('tiny'));

//use .env file
require('dotenv').config();
const PORT = process.env.PORT || 4000;

//use cookie-parser middleware
app.use(cookieParser());

//set view engine
app.set("view engine","ejs");



//use express ejs layout
app.use(expressEjsLayout);
app.set('layout','layouts/layout');
app.set("layout extractStyles", true);

//require authorization
const AUTH = require('./middlewares/Authorization');

//let your app handles json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//set static file folders
app.use('/static', express.static(path.join(__dirname,'public')))

//get the database connection
const connect = require('./utils/Database');
connect();

/**
 * Direct routes is just for 
 * testing porpuses only
 */
//use direct route
const DirectRoute = require('./routes/DirectRoute');
app.use("/",DirectRoute);

//use quiz zone routes
const QuizZoneRoutes = require('./routes/QuizZoneRoutes');
app.use('/app',QuizZoneRoutes);

//use account routes
const AccountRoutes = require('./modules/account/routes/AccountRoute');
app.use('/user',AccountRoutes);


//handles 404 urls
app.use((req, res)=>{
    res.send("Page not found!");
})


app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));