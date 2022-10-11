const mysql = require("mysql")

const conn = mysql.createConnection( {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dataStrings: true
})

conn.connect((err) => {
    if (err) {
        console.log("Connection Failed")
        throw err;
    } else {
        console.log("Connection Success")
    }
})

module.exports = conn