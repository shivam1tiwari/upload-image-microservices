const {Pool}  = require('pg');
require('dotenv').config();
console.log(process.env)
const host =  process.env.HOST_NAME;
const port = process.env.PORT
const userName = process.env.USER_NAME
const password = process.env.PASSWORD
const database = process.env.DATABASE_NAME
const pool = new Pool({
  host:host ,
  port:port ,
  user:userName ,
  password:password ,
  database: database
})

module.exports = pool;
