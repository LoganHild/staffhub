//mysql2 connection
const connection = require("../connection/mysql");

//query for all departments
function allDepartments() {
    connection.query(`SELECT * FROM departments`);
}

//query for all roles
function allRoles() {
    connection.query(`SELECT * FROM role`);
}

//query for all employees
function allEmployees() {
    connection.query(`SELECT * FROM employee`);
}

//query for adding a department
function addDepartment(departments) {
    connection
      .query(
          `INSERT INTO departments (department) VALUES (?)`, 
          departments
        );
}

//query for adding a role
function addRole(title, salary, departmentId) {
    connection
      .query(
          `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, 
          [title, salary, departmentId]
        );
}

//query for adding an employee
function addEmployee(firstName, lastName, title, manager) {
    connection
      .query(
          `INSERT INTO employee (first_name, last_name, roleid, manager_id) 
          VALUES (?, ?, ?, ?)`, 
          [firstName, lastName, title, manager]
        );
}

//query for updating a role
function updateRole(id, newRole) {
    connection
      .query(
          `UPDATE employee SET role_id = ? WHERE id = ?`,
          [newRole, id]
      );
}

module.exports = {allDepartments, allRoles, allEmployees, addDepartment, addRole, addEmployee, updateRole}