const mysql = require('mysql2'); 

const mysqlconnection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:process.env.DBPassword,
  database:'LoginRegisterAPI',
})

mysqlconnection.connect((err) => {
  if(err){
    console.log('Error in Database Connection' + JSON.stringify(err,undefined,2));
  }else{
    console.log('Database Connected Successfully!');
  }
})

module.exports = mysqlconnection;