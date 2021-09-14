//packages
const inquirer = require('inquirer');
const consoleTable = require('console.table');

//mysql2 connection folder
require('./connection/mysql');

//Validation
const valid = (input) => {
    if(input === '' || input === undefined) {
        return"Please enter a value or use Ctrl C to restart."
    }
    return true
};

//options for central lobby
const lobbyOptions = [
    'View All Employees',
    'Add Employee',
    'Update Employee Role',
    'View All Roles',
    'Add Role',
    'View All Departments',
    'Add Department',
    'Quit'
];

//options for department
const departments = [
    'Engineering',
    'Finance',
    'Legal',
    'Sales',
    'Service'
];

//options for role
const roles = [
    'Sales Lead',
    'Salesperson',
    'Lead Engineer',
    'Software Engineer',
    'Account Manager',
    'Accountant',
    'Legal Team Lead',
    'Lawyer',
    'Customer Service'
]
//inquirer prompts
const lobby = () => {
    console.log('Let\'s begin!')
    inquirer.prompt([
        {
            type: 'list',
            name: 'centralLobby',
            message: 'What would you like to do?',
            choices: lobbyOptions
        }
    ]).then((data) => { //All but quit go back to centralLobby
        if (data.centralLobby === 'View All Employees') {
            //display all employees everything
        } else if (data.centralLobby === 'Add Employee') {
            //ask What is employees first name? input
            //ask What is employees last name? input
            //ask What is employees role? list
            //ask Who is the employees Manager? list of empoloyee names(none if manager)
            //add to database and success message
        } else if (data.centralLobby === 'Update Employee Role') {
            //ask Which employee's role would you like to update? list of employee names
            //ask Which role do you want to assign the selected employee? list
            //update database and give success message
        } else if (data.centralLobby === 'View all roles') {
            //display all roles
        } else if (data.centralLobby === 'Add role') {
            //ask What is the name of the role? input
            //ask What is the salary of the role? list
            //ask Which department it belongs to? list
            //add to database and success message
        } else if (data.centralLobby === 'View All Departments') {
            //display all departments
        } else if (data.centralLobby === 'Add Department') {
            //ask what is the name of the department
            //then add to database and give success message
        } else {
            //quit
        }
    })
}