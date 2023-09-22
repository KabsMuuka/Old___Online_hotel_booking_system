// bcrypt encrypts passwords into hashpasswords
const bcrypt = require('bcrypt');

const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: "5432",
    password: 'kabs',
    database: 'HOTEL',
});
//imports
const nodemailer = require('nodemailer')

const register = async (req,res) =>{
    const {username,email,password} = req.body;
    const insertQuery = `
   INSERT INTO register(username,email,password)
   VALUES($1, $2, $3);
   `
   try {
    //encrypt the password 
    const hashedPassword = await bcrypt.hash(password,10);

    //adding the encrypted password into the database
    await pool.query(insertQuery,[username,email,hashedPassword]);
    console.log('successfully added user info, into the database')
    res.status(200).json({ message: 'Registration successful' });

   } catch (error) {
    console.log('Failed to insert user infor',error);
    res.status(400).json({ message: 'Registration failed' });
   }
}




const getAllStudents = (req,res) =>{
    try {
        pool.query(`SELECT * FROM customers`,(error,result)=>{
        if (error) throw error;
        res.status(200).json(result.rows);
        });
    } catch (error) {
        res.status(400).json({message:error.message})
    }
};

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
    register,
    User,
    getAllStudents,


    //renders
    Index,
    login,
    signup,
    reserve,
    admin,
   
}
