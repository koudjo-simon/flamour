const mysql = require("mysql2");

const dataBase = mysql.createConnection({
    host: 'localhost',
    database: 'love_link',
    user: 'root',
    password: ''
});
dataBase.connect((error) => {
    if(error) throw Error(error);
    console.log("Connected to dataBase");
});

module.exports = dataBase;