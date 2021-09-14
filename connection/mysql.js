const mysql = require('mysql2');

module.exports = () => {
    const db = mysql.createConnection(
        {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: '',
        database: ''
        },
        console.log(`Connected to the classlist_db database.`)
    );
}