const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    firstName: {
        type: String,
        require:true,
    },
    lastName: {
        type: String,
        require:true,
    },
    email: {
        type: String,
        require:true,
    },
    gender: {
        type: String,
        require:true,
    },
    nationality: {
        type: String,
        require:true,
    },
    phonenumber: {
        type: String,
        require:true,
    }, 
}, {timestamps: true})

const customer = mongoose.model('customer',customerSchema);

module.exports = customer;