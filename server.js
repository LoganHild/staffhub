//packages
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

//Functions for adding table values
const departmentAdd = require('./src/addTableValues.js');

//mysql2 connection
const db = require('./connection/mysql');
const Employees = require("./lib/Employees");
const Department = require('./lib/Departments');


//String Validation
const validString = (input) => {
  const valid = input.match(/^[a-z A-Z | '-`]+$/);
  if (input === "" || input === undefined || input.length < 2) {
    return "Please enter a valid name.";
  } else if (valid) {
    return true;
  } else {
    return "Value must be a string of alphabetical characters.";
  }
};

//Number Validation
const validNumber = (input) => {
  if (input === "" || input === undefined) {
    return "Please enter a valid salary.";
  } else if (isNaN(input)) {
    return "Must be a numerical value.";
  } else {
    return true;
  }
};

//options for central lobby
const lobbyOptions = [
  "View All Employees",
  "Add Employee",
  "Update Employee Role",
  "View All Roles",
  "Add Role",
  "View All Departments",
  "Add Department",
  "Quit",
];

//inquirer prompts
const lobby = () => {
  console.log("Let's begin!");
  inquirer
    .prompt({
      type: "list",
      name: "centralLobby",
      message: "What would you like to do?",
      choices: lobbyOptions,
    })
    .then((data) => {
      switch (data.centralLobby) {
        case "View All Employees":
          viewEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Quit":
          quit();
          break;
        default:
          console.log("Something went wrong! Use ctrl c to exit!");
      }
    });
};

//departments array
const departmentsArray = [];

//roles array
const rolesArray = []

//employees array
const employeesArray = [];

function viewEmployees() {
  db.query(
    "SELECT first_name, last_name, manager_id, title, salary, departments.department FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id;",
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      lobby();
    }
  );
}

function addEmployee() {

    db.query(
        "SELECT * FROM roles;",
        function (err, rolesTableResults) {
          if (err) {
            console.log(err);
          }
          console.table(rolesTableResults);

          inquirer
          .prompt([
            {
              type: "input",
              name: "firstName",
              message: "What is the employee's first name?",
              validate: validString,
            },
            {
              type: "input",
              name: "lastName",
              message: "What is the employee's last name?",
              validate: validString,
            },
            {
              //won't let me do anything but integer
              type: "input",
              name: "employeeRole",
              message: "What is the employee's role?",
            },
            //need to find a way to add the employee table like we added the roles above to select employee id
            // {
            //     //won't let me do anything but integer
            //     // type: 'input',
            //     // name: 'managers',
            //     // message: 'Who is the employee\'s manager?',
            //     //need to add choices, maybe use a query, put into a variable, then take the values
            //     //need to add none to the list somehow as well
            // }
          ])
          .then((data) => {
            //add data to database table and give success message
            db.query(
              "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
              [data.firstName, data.lastName, data.employeeRole, data.managers],
              (err, results) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Successfully added new employee!");
                  lobby();
                }
              }
            );
          });
      

        }//end of 
      );//end of select all rows in roles

 
}//end addEmployee() definition

function updateRole() {
  //ask Which employee's role would you like to update? list of employee names
  db.query(
    "SELECT * FROM employees;",
    function (err, employeesTableResults) {
      if (err) {
        console.log(err);
      }
      console.table(employeesTableResults);

      inquirer.prompt([
        {
          type: 'input',
          name: 'employeeSelect',
          message: 'Please enter the id of the employee you would like to update from above.'
        }
      ])
      .then((data) => {

      })
    }
  )      
}
            // inquirer.prompt([
            //     type: 'input',
            //     name: 'selectRole',
            //     message: "Enter the id of the role you would like to assign from the table above."
            //   ])
  //ask Which role do you want to assign the selected employee? list
  //update database and give success message, query function thing
 



function viewRoles() {
  db.query(
    "SELECT title, salary, department FROM roles JOIN departments ON roles.department_id = departments.id;",
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      lobby();
    }
  );
}

function addRole() {
  db.query(
    'SELECT * FROM roles;', 
    function (err, rolesTableResults) {
      if (err) {
        console.log(err);
      }
      console.table(rolesTableResults);

      inquirer.prompt([
        {
          type: "input",
          name: "roles",
          message: "What is the name of the role?",
          validate: validString,
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
          validate: validNumber,
        },
        {
          type: "input",
          name: "departments",
          message: "Please enter the id of the department this role belongs to from the table above.",
          //need to fix the validate for this one, only one character, need to fix and change to list
        },
      ])
    }
  )
  // inquirer
  //   .prompt([
  //     {
  //       type: "input",
  //       name: "roles",
  //       message: "What is the name of the role?",
  //       validate: validString,
  //     },
  //     {
  //       type: "input",
  //       name: "salary",
  //       message: "What is the salary of the role?",
  //       validate: validNumber,
  //     },
  //     {
  //       type: "input",
  //       name: "departments",
  //       message: "Which department does this role belong to?",
  //       //need to fix the validate for this one, only one character, need to fix and change to list
  //     },
  //   ])
    .then((data) => {
      let newRole = new Role
    })
    // .then((data) => {
    //   //********need to ask about changing to a list option and how to correlate to id */
    //   db.query(
    //     "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
    //     [data.roles, data.salary, data.departments],
    //     (err, results) => {
    //       if (err) {
    //         console.log(err);
    //       } else {
    //         console.log("Successfully added new role!");
    //         lobby();
    //       }
    //     }
    //   );
    // });
}

function viewDepartments() {
  db.query("SELECT * FROM departments", (err, results) => {
    if (err) {
      console.log(err);
    }
    console.table(results);
    lobby();
  });
}

function addDepartment() {

  inquirer.prompt([
    {
      type: 'input',
      name: 'newDepartment',
      message: 'What is the name of the department?',
      validate: validString
    }
  ])
  .then((data) => {
    let newDepartment = new Department(data.newDepartment);
    departmentsArray.push(newDepartment);
    departmentAdd(departmentsArray);
  })
  // inquirer
  //   .prompt({
  //     type: "input",
  //     name: "newDepartment",
  //     message: "What is the name of the department?",
  //     validate: validString,
  //   })
  //   .then((data) => {
  //     //adds new department to the array of departments for list selection
  //     db.query(
  //       `INSERT INTO departments (department) VALUES (?)`,
  //       data.newDepartment,
  //       (err, results) => {
  //         if (err) {
  //           console.log(err);
  //         }
  //         console.log("Successfully added new department!");
  //         lobby();
  //       }
  //     );
  //   });
}

function quit() {
  //quit with goodbye message maybe
}

//invokes prompts
lobby();
