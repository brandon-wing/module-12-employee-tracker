const inquirer = require("inquirer")
const mysql = require('mysql2');
const cTable = require('console.table');
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
              addRole();
                break;
            case 'Add an employee':
              addEmployee();
                break;
            case 'Update an employee role':
              updateRole();
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
    })
//using DB queries to insert data into the tables
//for some reason the template literal only works when using backticks, not quotes or single quotes
.then((choice) => {(connection.query(`INSERT INTO department (name) VALUES ('${choice.department}');`))
  console.log("The department has been added!")
  welcomePrompt();
})}

  function addRole(){
    // query the database to retrieve the data you want to use as choices
connection.query('SELECT id, name FROM department', (err, results) => {
  if (err) throw err;

  // console.log("Results: ", results);
  // Have to make the data from the table an object that Inquirer can use
  const deptChoices = results.map(results => ({
    name: results.name,
    value: results.id
  }));

  //console.log("Dept Choices: ", deptChoices);

    inquirer.prompt([
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
      type: 'list',
      message: 'Which department is this role employed in?',
      name: 'roleDepartment',
      choices: deptChoices
    }])
    .then((choice) => {
      console.log("Answer: ", choice)
      connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${choice.role}', '${choice.roleSalary}', '${choice.roleDepartment}');`)
      console.log("Role has been added to the Database!")
      welcomePrompt();
  });
});
}


  function addEmployee() {
    connection.query('SELECT title, id FROM role', (err, results) => {
      if (err) throw err;
    
      const roleChoices = results.map(results => ({
        name: results.title,
        value: results.id
      }));

    connection.query('SELECT first_name, last_name, id FROM employee', (err, results) => {
      if (err) throw err;
      console.log(results)
      const managerChoices = results.map(resultsTwo => ({
        name: resultsTwo.first_name.concat(resultsTwo.last_name),
        value: resultsTwo.id
      }));
 
  inquirer.prompt([{
      type: 'input',
      message: 'What is the first name of the employee?',
      name: 'firstName'
  },
  {
      type: 'input',
      message: 'What is the last name of the employee?',
      name: 'lastName'
  },
  {
      type: 'list',
      message: 'What is the role of the employee?',
      name: 'employeeRole',
      choices: roleChoices
  },
  {
      type: 'list',
      message: 'Who is the manager of the employee?',
      name: 'employeeManager',
      choices: managerChoices
  }
])
  .then((choice) => {connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${choice.firstName}', '${choice.lastName}', '${choice.employeeRole}', '${choice.employeeManager}')`);
  console.log("The employee has been added to the Database!")
  welcomePrompt();
})
})
})
};


function updateRole(){

connection.query('SELECT first_name, last_name, id FROM employee', (err, results) => {
if (err) throw err;


const empList = results.map(results => ({
  name: results.first_name.concat(results.last_name),
  value: results.id
}));

connection.query('SELECT title, id FROM role', (err, results) => {
  if (err) throw err;
  
  
  const roleList = results.map(resultsTwo => ({
    name: resultsTwo.title,
    value: resultsTwo.id
  }));

  inquirer.prompt([
    {
    type: 'list',
    message: 'Whose role would you like to update?',
    name: 'pickedEmployee',
    choices: empList
     },
     {
    type: 'list',
    message: 'What is their new role?',
    name: 'newRole',
    choices: roleList
     }])
  .then((choice) => {
    connection.query(`UPDATE employee SET role_id= ${choice.newRole} WHERE id = ${choice.pickedEmployee};`)
console.log("Role has been updated in the Database!")
    welcomePrompt();
  })
})
})
};

function viewDepartments(){
  connection.query('SELECT * FROM department', (err, results) => {
    if (err)
    throw err;
    console.log('|-_-_-_-_-_-_-_-_-_-|')
    console.table(results)})
            welcomePrompt();}

            function viewEmployees(){


  connection.query('SELECT * FROM employee', (err, results) => {
    if (err)
    throw err;
    console.log('|-_-_-_-_-_-_-_-_-_-|')
    console.table(results)})
            welcomePrompt();}

            
function viewRoles(){
  connection.query('SELECT * FROM role', (err, results) => {
    if (err)
    throw err;
    console.log('|-_-_-_-_-_-_-_-_-_-|')
    console.table(results)})
            welcomePrompt();}
welcomePrompt();