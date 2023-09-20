const pool = require('../db/database');
const nodemailer = require('nodemailer')
let customer = require('../Model/customer');

const getAllStudents = (req,res) =>{
    pool.query(`SELECT * FROM customers`,(error,result)=>{
    if (error) throw error;
    res.status(200).json(result.rows);
   });
};


const User = async(req,res) =>{
    const { firstName,lastName,email,gender,nationality,phoneNumber } = req.body;
    const insertQuery = ` 
    INSERT INTO customers(firstName,lastName,email,gender,nationality,phoneNumber)
    VALUES($1, $2, $3,$4, $5, $6)
    `
    try {
        const result = await pool.query(insertQuery,[firstName,lastName,email,gender,nationality,phoneNumber]);
        console.log(`successfully inserted data ${result}`);
    } catch (error) {
        console.log('failed to save data into database');
    }
}










//mongoose

const mailTransporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kipmoore315@gmail.com',
        pass: 'kabs1973'
    },
})

const getinfor = async(req,res)=> {
   
    try {
        const customers = await customer.find();
        for (customer in customers) {
            const emailData = {
                from: 'kipmoore315@gmail.com',
                to: customer.Email,
                subject:'Testing',
                text: 'You have successfully booked a room from Online Hotel management system!',
            }
            await mailTransporter.sendMail(emailData)
            console.log('Email has been sent!')
        }
       // res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};


// const User = async(req,res)=>{
//     try {
//         const user = new customer(req.body);
//         await user.save();
//         console.log('User infor saved in database')
     
//     } catch (error) {
//         res.status(400).json({message: error.message})
//     }
// }
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



module.exports ={
    Index,
    login,
    signup,
    reserve,
    admin,
    getinfor,
    User,
    getAllStudents
}
