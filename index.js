// const mysql = require("mysql");
const view = require("./view")
const inquirer = require("inquirer"); //grabbing libraries
const table = require("console.table")
// var connection = mysql.createConnection({ //creating server
//   host: "localhost",

//   port: 3306,

//   user: "root",

//   password: "root",
//   database: "employee_DB"
// });

menu()

async function menu(){
   await inquirer.prompt(//main menu prompt
        [
            {
                type: "list",
                name: "menuChoice",
                message: "What would you like to do?",
                choices: ["View all employees","View all roles","View all departments","View all employees by department","View all employees by manager","Add new employee", "Add role", "Add department","Remove employee", "Remove role", "Remove department", "Update employee role", "Update employee manager"]
            }
        ]
    ).then(answers => {
        var choice = answers.menuChoice
        if(choice.includes("View")){
            view(answers);
        }
    }).catch(error => {
        console.log("error")
        throw error
    })
    
}

