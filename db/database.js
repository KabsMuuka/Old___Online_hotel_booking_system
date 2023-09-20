const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    port: "5432",
    password: 'kabs',
    database: 'publicDB',
});

module.exports = pool;