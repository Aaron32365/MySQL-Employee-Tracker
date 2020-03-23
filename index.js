const mysql = require("mysql");
const inquirer = require("inquirer"); //grabbing libraries
const table = require("console.table")
var connection = mysql.createConnection({ //creating server
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "top_songsDB"
});

Initialize()

async function Initialize(){
   await inquirer.prompt(
        [
            {
                type: "list",
                name: "menuChoice",
                message: "What would you like to do?",
                choices: ["View all employees","View all roles","View all departments","View all employees by department","View all employees by manager","Add new employee", "Add role", "Add department","Remove employee", "Remove role", "Remove department", "Update employee role", "Update employee manager"]
            }
        ]
    ).then(res => {
        console.log(res)
        switch (res){
            
        }
    }).catch(error => {
        throw error
    })
    
}

