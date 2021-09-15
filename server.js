//packages
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

//mysql2 connection folder
const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
    },
    console.log(`Connected to the StaffHub employee database.`)
);

//Validation
const validString = (input) => {
    if(input === '' || input === undefined || input.length < 2) {
        return "Please enter a valid name."
    } else if(isNaN(input)) {
        return true
    } else {
        return "Value must be a string of alphabetical characters."
    }
};

const validNumber = (input) => {
    if(input === '' || input === undefined || input.length < 5) {
        return "Please enter a valid salary."
    } else if(isNaN(input)) {
        return "Must be a numerical value."
    } else {
        return true
    }
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
    'Sales'
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
    'Lawyer'
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
            db.query('SELECT first_name, last_name, manager_id, title, salary, departments.department FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id;',
            function (err, results) {
                console.table(results);
                lobby();
            })
        } else if (data.centralLobby === 'Add Employee') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the employee\'s first name?',
                    validate: validString
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the employee\'s last name?',
                    validate: validString
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
            //update database and give success message, query function thing
        } else if (data.centralLobby === 'View all roles') {
            //display all roles
            db.query(
                'SELECT title, salary, department FROM roles JOIN departments ON roles.department_id = departments.id', function (err, results) {
                        console.table(results);
                    })
        } else if (data.centralLobby === 'Add Role') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'roles',
                    message: 'What is the name of the role?',
                    validate: validString
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of the role?',
                    validate: validNumber
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
            db.query('SELECT * FROM departments', async function (err, results) {
                console.table(results);
                lobby();
            })
            lobby();
        } else if (data.centralLobby === 'Add Department') {
            //ask what is the name of the department
            inquirer.prompt(
                {
                    type: 'input',
                    name: 'newDepartment',
                    message: 'What is the name of the department?',
                    validate: validString
                }
            ).then((data) => {
                //adds new department to the array of departments for list selection
                let addDepartment = data.newDepartment;
                departments.push(addDepartment)
                lobby();
            })
        } else {
            //quit, with goodbye message maybe
        }
    })
}

//invokes prompts
lobby();