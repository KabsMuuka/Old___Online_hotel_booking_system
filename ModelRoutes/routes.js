const express = require('express');
const route = express.Router();

const {Index,login,signup,reserve,User,admin,getAllUsers,adminLogin,loginAsAdmin,loging,register,roomtype} = require('../ModelControl/control')

//database routes
route.post('/',register);
route.post('/',loging);

route.post('/',loginAsAdmin);

route.post('/',User);
route.get('/',getAllUsers);



//database routes
//EJS render
route.get('/',Index);
route.get('/',login);
route.get('/',signup);
route.get('/',reserve);
route.get('/',admin);
route.get('/',adminLogin);
route.get('/',roomtype);


module.exports = route;
