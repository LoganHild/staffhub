//packages
const inquirer = require('inquirer');
const consoleTable = require('console.table');

//mysql2 connection folder
require('./connection/mysql');

//************Make 2 validations for number and string values */

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
    inquirer.prompt(
        {
            type: 'list',
            name: 'centralLobby',
            message: 'What would you like to do?',
            choices: lobbyOptions
        }
    ).then((data) => { //All but quit go back to centralLobby
        if (data.centralLobby === 'View All Employees') {
            //display all employees everything
        } else if (data.centralLobby === 'Add Employee') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the employee\'s first name?',
                    validate: valid
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the employee\'s last name?',
                    validate: valid
                },
                {
                    type: 'list',
                    name: 'employeeRole',
                    message: 'What is the employee\'s role?',
                    choices: roles
                },
                {
                    type: 'list',
                    name: 'managers',
                    message: 'Who is the employee\'s manager?',
                    //need to add choices, maybe use a query, put into a variable, then take the values
                    //need to add none to the list somehow as well
                }
            ]).then((data) => {
                //add data to database table and give success message
                lobby();
            });
        } else if (data.centralLobby === 'Update Employee Role') {
            //ask Which employee's role would you like to update? list of employee names
            //ask Which role do you want to assign the selected employee? list
            //update database and give success message
        } else if (data.centralLobby === 'View all roles') {
            //display all roles
        } else if (data.centralLobby === 'Add role') {
            //ask What is the name of the role? input
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'roles',
                    message: 'What is the name of the role?',
                    validate: valid
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of the role?',
                    validate: valid
                },
                {
                    type: 'list',
                    name: 'departments',
                    message: 'Which department does this role belong to?',
                    choices: departments
                }
            ]).then((data) => {
                //add data to database table and give success message
                lobby();
            })
        } else if (data.centralLobby === 'View All Departments') {
            //display all departments
        } else if (data.centralLobby === 'Add Department') {
            //ask what is the name of the department
            inquirer.prompt(
                {
                    type: 'input',
                    name: 'newDepartment',
                    message: 'What is the name of the department?',
                    validate: valid
                }
            ).then((data) => {
                //adds new department to the array of departments for list selection
                let addDepartment = data.newDepartment;
                departments.push(addDepartment)
            })
        } else {
            //quit, with goodbye message maybe
        }
    })
}

//invokes prompts
lobby();