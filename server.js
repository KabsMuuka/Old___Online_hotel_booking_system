const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const routes = require('./ModelRoutes/routes');
const {Index,login,reserve,signup,admin} = require('./ModelControl/control');
//nodemailer transporter

const app = express();
app.use(express.json());
//middleware
app.use(bodyParser.urlencoded({ extended:true }));
//static images
app.use(express.static(path.join(__dirname, 'public')));

//connecting to db

const port = 3000;
app.listen(port,(req,res)=>{
    console.log(`running on port ${port}`)
})
//views 
app.set('view engine','ejs');
//routes

//get all students
app.use('/api/fetch',routes);
//create users
app.use('/userlog',routes);



// app.use('/api/students',getAllStudents)

app.use('/index',Index)
app.use('/admin',admin)
app.use('/login',login)
app.use('/signup',signup)
app.use('/reserve',reserve)

