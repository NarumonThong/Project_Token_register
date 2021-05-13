let mysql = require('mysql');
// let connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'it1234',
//     database : 'barter_kub_db'
// });

let connection = mysql.createConnection({
    host     : 'us-cdbr-east-03.cleardb.com',
    user     : 'b87538a1b187e9',
    password : '782ffcdc',
    database : 'heroku_18176ce7d5bf4f5'
});

connection.connect((error) => {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Connected...');
    }
});

module.exports = connection;

//b87538a1b187e9:782ffcdc@us-cdbr-east-03.cleardb.com/heroku_18176ce7d5bf4f5?reconnect=true