// bcrypt encrypts passwords into hashpasswords
const bcrypt = require('bcrypt');
const pool = require('../db/hotelDB');
//imports
const nodemailer = require('nodemailer')

const register =  async(req,res) =>{
    const {username,email,password} = req.body;
    //check if the email already exist
    const result = await pool.query(`SELECT email FROM register WHERE email = $1`,[email]);
    //checks if theres any matching email
    if(result.rows.length > 0){
        res.status(403).json(`Email already in Use: ${email}`);

    }else{

    const insertQuery = `
     INSERT INTO register(username,email,password)
     VALUES($1, $2, $3); `
   try {
    //encrypt the password 
    const hashedPassword = await bcrypt.hash(password,10);

    //adding the encrypted password into the database
    await pool.query(insertQuery,[username,email,hashedPassword]);
    console.log('successfully added user info, into the database')
    res.status(200).json({ message: 'Registration successful' });

   } catch (error) {
    res.status(500).json({ message: `Registration failed}`});
    }
 }
}

// const adminS = async(req,res)=>{
//     const {email, password} = req.body;

//     const insertQuery = `INSERT INTO admin(email, password)
//     VALUES($1,$2);
//     `
//     try {
//         const hashedPassword = await bcrypt.hash(password,10);
//         await pool.query(insertQuery,[email,hashedPassword]);
//         res.status(200).json({message:'Successfully added admin infor'})
//         res.redirect('/login')
//     } catch (error) {
//         res.status(400).json({message: 'failed to add to admin'})
//     }
// }

const getAllUsers = (req,res) =>{
    try {
        pool.query(`SELECT * FROM register`,(error,result)=>{
        if (error) throw error;
        res.status(200).json(result.rows);
        });
    } catch (error) {
        res.status(400).json({message:error.message})
    }
};

const loging = async(req,res) =>{
    const {email,password} = req.body;

    const userResults = await pool.query(`SELECT email, password FROM register WHERE email=$1`,[email]);
    if(userResults.rows.length === 0){
        res.status(400).json('No user with that email exits');
    }
    const user = userResults.rows[0];
    const passwordMatch = await bcrypt.compare(password,user.password);
    // console.log('user pass',password);
    // console.log('hashed pass',user.password);
    
    if(passwordMatch){
        res.redirect('/index');
    }else{
       // req.flash('message', 'Incorrect password or email');
        res.status(401).json({message: 'Incorrect password or email'});
        res.redirect('/login');
    }
        // Now, render the 'login' template with the message
       // res.render('login', { message: req.flash('message') });
}


const loginAsAdmin = async(req,res) =>{
    const {email,password} = req.body;

    const userResults = await pool.query(`SELECT email, password FROM admin WHERE email=$1`,[email]);
    if(userResults.rows.length === 0){
        res.status(400).json('No user with that email exits');
    }
    const user = userResults.rows[0];
    const passwordMatch = await bcrypt.compare(password,user.password);
  
    if(passwordMatch){
        res.redirect('/admin');
    }else{
        res.status(500).json({message: 'incorrect password or email'})
    }
}

const User = async(req,res) =>{
    const { firstName,lastName,email,gender,nationality,phoneNumber } = req.body;
    const insertQuery = ` 
    INSERT INTO customers(firstName,lastName,email,gender,nationality,phoneNumber)
    VALUES($1, $2, $3,$4, $5, $6)
    `
    try {
        await pool.query(insertQuery,[firstName,lastName,email,gender,nationality,phoneNumber]);
        console.log(`successfully inserted data`);
        res.status(200).json({ message: 'successful added customer infor' });
    } catch (error) {
        console.log('failed to save data into database',error);
    }
}



//rendering pages on webpage using EJS
const login = (req,res)=>{
    try {
        //rendering index.ejs to webpage
       res.render('login')
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
const admin = (req,res)=>{
    try {
        //rendering index.ejs to webpage
       res.render('admin')
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const signup = (req,res)=>{
    try {
        //rendering index.ejs to webpage
       res.render('signup')
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const adminLogin = (req,res)=>{
    try {
        //rendering index.ejs to webpage
       res.render('adminLogin');
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const roomtype = (req,res)=>{
    try {
        //rendering index.ejs to webpage
       res.render('roomtype');
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const Index = (req,res)=>{
    try {
        //rendering index.ejs to webpage
        res.render('index');
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
const reserve = (req,res)=>{
    try {
        //rendering index.ejs to webpage
       res.render('reserve') 
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
module.exports = {
    //database
    loginAsAdmin,
    register,
    User,
    getAllUsers,
    loging,

    //renders
    Index,
    login,
    roomtype,
    adminLogin,
    signup,
    reserve,
    admin,
}
