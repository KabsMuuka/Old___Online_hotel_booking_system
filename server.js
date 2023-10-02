if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const pool = require('./db/hotelDB');
const bcrypt = require('bcrypt');

const session = require('express-session')
const flash = require('express-flash');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const routes = require('./ModelRoutes/routes');

const {Index,login,reserve,signup,admin,roomtype,adminLogin} = require('./ModelControl/control');

//nodemailer transporter
const app = express();
app.use(express.json());
//middleware
app.use(bodyParser.urlencoded({ extended:true }));
//static images
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'views')));


const port = 3000;
app.listen(port,(req,res)=>{
    console.log(`running on port ${port}`)
})
//views 
app.set('view engine','ejs');

//route
//get all students

app.use('/loging',routes);
app.use('/api/fetch',routes);
app.use('/register',routes);
app.use('/loginAsAdmin',routes);

//ejs
app.use('/index',Index)
app.use('/adminLogin',adminLogin)
app.use('/admin',admin)
app.use('/roomtype',roomtype)
app.use('/login',login)
app.use('/signup',signup)
app.use('/reserve',reserve)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

