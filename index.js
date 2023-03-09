const inquirer = require("inquirer")
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('.')
//all the packages required are above!

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mb0217nt!',
    database: 'employeetracker_db'
  });
  //Welcome/entry screen with the first set of questions.
  function welcomePrompt(){
    inquirer.prompt = {
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
    'Nothing']
}}


  function addDepartment(){
  [{
    type: 'input',
    message: 'What is the name of the department you would like to add?',
    name: 'department'
  }]};

  function addRole(){
    [{
    type: 'input',
    message: 'What is the name of the role that you would like to add?',
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
  }]};

  function addEmployee() {
  [{
    type: 'input',
    message: 'What is the first name of the employee?',
    name: 'firstname'
  },
  {
    type: 'input',
    message: 'What is the last name of the employee?',
    name: 'lastname'
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
  }]};

  function updateRole(){
  [{
    type: 'input',
    message: 'Whose role would you like to update?',
    name: 'updateRole'
  }]};
