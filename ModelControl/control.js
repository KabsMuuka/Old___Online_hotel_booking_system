
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
        const result = await pool.query(insertQuery,[firstName,lastName,email,gender,nationality,phoneNumber]);
        console.log(`successfully inserted data${result.rows}`);
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
    Index,
    login,
    signup,
    reserve,
    admin,
    User,
    getAllStudents
}
