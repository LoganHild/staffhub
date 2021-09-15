const mysql = require('mysql2');

module.exports = () => {
    mysql.createConnection(
        {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: '',
        database: 'employee_db'
        },
        console.log(`Connected to the StaffHub employee database.`)
    );
}