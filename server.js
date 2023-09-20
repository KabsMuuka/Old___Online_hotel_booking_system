//imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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

const port = 3000;

//views 
app.set('view engine','ejs');
//routes
app.use('/api/data',routes);

//create users
app.use('/userlog',routes);



//const uri ='mongodb+srv://kabsTry:thisisit@cluster0.w48y7mo.mongodb.net/HOTEL?retryWrites=true&w=majority';
const uri = 'mongodb://127.0.0.1:27017';

mongoose.connect(uri).then(()=>{
    app.listen(port,()=>{
        console.log(`successfully connected to db ${port}`)
    })
}).catch(error => console.log(error));

// app.use('/api/students',getAllStudents)

app.use('/index',Index)
app.use('/admin',admin)
app.use('/login',login)
app.use('/signup',signup)
app.use('/reserve',reserve)


