const inquirer = require("inquirer")
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require(".")
//all the packages required are above!

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',

    password: 'Mb0217nt!',
    database: 'employeetracker_db'
  });
  //Welcome/entry screen with the first set of questions.
  function welcomePrompt() {
    inquirer.prompt([
        {
      type: 'list',
      message: 'Welcome to the Employee tracker! Please choose a following option.',
      name:'welcome',
      choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'nothing']
        }
                  ])

      //I thought a switch/case statement worked best to determine which function occurs
      //depending on the choice the user picks on the welcome prompt
      .then((choice) => {
        switch(choice.welcome) {
            case 'View all departments':
              viewDepartments();
                break;
            case 'View all roles':
              viewRoles();
                break;
            case 'View all employees':
              viewEmployees();
                break;
            case 'Add a department':
              addDepartment();
                break;
            case 'Add a role':
                break;
            case 'Add an employee':
                break;
            case 'Update and employee role':
                break;
            case 'nothing':
                console.log('Thanks for using the employee tracker.');;
        }})
};


  function addDepartment(){
    inquirer.prompt({
      type: 'input',
      message: 'What is the name of the department you would like to add?',
      name: 'department'

//using DB queries to insert data into the tables
//for some reason the template literal only works when using backticks, not quotes or single quotes
  }).then((choice) => {(connection.query(`INSERT INTO department (name) VALUES (${choice.department});`,err))
  console.log("The department has been added!")
  welcomePrompt();
})}

  function addRole(){
    inquirer.prompt(
      {
      type: 'input',
      message: 'What is the title of the role that you would like to add?',
      name: 'role'
       },
       {
      type: 'input',
      message: 'What is the salary for the role?',
      name: 'roleSalary'
       },
       {
      type: 'input',
      message: 'Which department is this role employed in?',
      name: 'roleDepartment'
    })
    .then((choice) => {(connection.query(`INSERT INTO role (title, salary, department_id) VALUES (${choice.role}, ${choice.roleSalary}, ${choice.roleDepartment};`))
    console.log("The role has been added!")
    welcomePrompt();
  })};

  function addEmployee() {
  inquirer.prompt({
      type: 'list',
      message: 'What is the first name of the employee?',
      choices: 'firstname'
  },
  {
      type: 'list',
      message: 'What is the last name of the employee?',
      choices: 'lastname'
  },
  {
      type: 'input',
      message: 'What is the role of the employee?',
      name: 'employeeRole'
  },
  {
      type: 'input',
      message: 'Who is the manager of the employee?',
      name: 'employeeManager'
  })
  .then((choice) => {(connection.query(`INSERT INTO employee (first_name, last_name, department_id) VALUES (${choice.firstname}, ${choice.lastname}, ${choice.role}, ${choice.manager};`))
  console.log("The employee has been added!")
  welcomePrompt();
})};

  function updateRole(){
  inquirer.prompt({
      type: 'input',
      message: 'Whose role would you like to update?',
      name: 'updateRole'
  })};
welcomePrompt();
function viewDepartments(){
  connection.query('SELECT * FROM department', function (err, results) {
    if (err)
    throw err;
    console.log('|-_-_-_-_-_-_-_-_-_-|')
    console.table(results)})
            welcomePrompt();}

            function viewEmployees(){
  connection.query('SELECT * FROM employee', function (err, results) {
    if (err)
    throw err;
    console.log('|-_-_-_-_-_-_-_-_-_-|')
    console.table(results)})
            welcomePrompt();}

function viewRoles(){
  connection.query('SELECT * FROM role', function (err, results) {
    if (err)
    throw err;
    console.log('|-_-_-_-_-_-_-_-_-_-|')
    console.table(results)})
            welcomePrompt();}