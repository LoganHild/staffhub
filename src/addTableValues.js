const mysql2 = require('mysql2');
const Employees = require('../lib/Employees');

const db = require('../connection/mysql');


function departmentAdd(data) {
    const addedDept = data.filter(Employees => Employees.getValue() === "Department");
    addedDept.forEach(Department => {
              //adds new department to the array of departments for list selection
            const newDept = Department.first_name;
        db.query(
            `INSERT INTO departments (department) VALUES (?)`, newDept,
            (err, results) => {
                if (err) {
                console.log(err);
                }
                console.log('Successfully added new department!', newDept);
            
            }
        );
    })

}

module.exports = departmentAdd;