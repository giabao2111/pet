const mysql = require('mysql');
//dùng createPool để performance tốt hơn
const connection = mysql.createPool({
   host:'localhost',
   user:'root',
   password:'',
   database:'petdb'
});
module.exports = connection;
