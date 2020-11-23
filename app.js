const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const expressEjsLayout = require('express-ejs-layouts');
const path = require('path');


//set view engine
app.set("view engine","ejs");

//use express ejs layout
app.use(expressEjsLayout);
app.set('layout','layouts/layout');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

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
app.use('/test',DirectRoute);




//handles 404 urls
app.use((req, res)=>{
    res.send("Page not found!");
})


app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));