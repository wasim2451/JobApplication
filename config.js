const dotenv=require('dotenv')
dotenv.config();
const DB_PASS=process.env.DB_PASSWORD;
module.exports={DB_PASS};