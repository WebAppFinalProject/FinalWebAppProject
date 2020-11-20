const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const expressEjsLayout = require('express-ejs-layouts');

//use express ejs layout
app.use(expressEjsLayout);
//get the database connection
const connect = require('./utils/Database');
connect();

app.get('/', (req, res)=>{
    res.send("Welcome");
})

app.use((req, res)=>{
    res.send("Page not found!");
})


app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));