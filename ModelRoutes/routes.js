const express = require('express');
const route = express.Router();

const {Index,login,signup,reserve,User,admin,getinfor} = require('../ModelControl/control')


//database routes
route.post('/',User);
route.get('/',getinfor);
//database routes
//EJS render
route.get('/',Index);
route.get('/',login);
route.get('/',signup);
route.get('/',reserve);
route.get('/',admin);


module.exports = route;
