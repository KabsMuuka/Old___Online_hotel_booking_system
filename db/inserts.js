const express = require('express')
const app = express();
app.use(express.json())
const {Pool} = require('pg');

app.use(methodOverride('_method'));

const pool = new Pool({
    user: 'postgres',
    port: "5432",
    password: 'kabs',
    database: 'HOTEL',
});

app.post('/insert',(req,res)=>{
    //assigin users request to data
    const { data } = req.body;
    pool.query('INSERT INTO customer VALUES ($1)',[data],(error,result)=>{
        if (error) throw error;
    
        console.log('Data inserted successfully');
        res.json({message: 'DATA inserted successfully'});
    }); 
});

app.listen(3000,()=>{
    console.log('running on port',3000)
})

