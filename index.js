const mysql = require("mysql");
const inquirer = require("inquirer"); //grabbing libraries
const table = require("console.table")
const Employee = require("./Objects/Employee")
var connection = mysql.createConnection({ //creating connection to server
  host: "localhost",

  port: 3306,

  user: "root",

  password: "root",
  database: "employee_DB"
});

menu()

async function menu(){
   await inquirer.prompt(//main menu prompt
        [
            {
                type: "list",
                name: "menuChoice",
                message: "What would you like to do?",
                choices: ["View all employees","View all roles","View all departments","Add new employee", "Add role", "Add department","Remove employee", "Remove role", "Remove department", "Update an employees role", "Update employee manager"]
            }
        ]
    ).then(res => {
        switch(res.menuChoice){
            case "View all employees":
                viewAllEmployees()
                break
            case "View all roles":
                viewAllRoles()
                break
            case "View all departments":
                viewAllDepartments()
                break
            case "Add new employee":
                addNewEmployee()
                break
            case "Add role":
                addRole()
                break
            case "Add department":
                addDepartment()
                break
            case "Update an employees role":
                updateEmpRole()
                break

        }
    }).catch(error => {
        console.log("error")
        throw error
    })
    
}

function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function(err, res) { //grabbing all employees from DB
        if(err) throw (err)
            for(let i = 0; i < res.length; i++){
                console.table([{
                id: res[i].id,
                first_name: res[i].first_name,
                last_name: res[i].last_name,
                role_id: res[i].role_id,        //change to department, salary, and manager
                manager_id: res[i].manager_id
            }])
        }
        
        menu()
    })
}

function viewAllRoles(){
    connection.query("SELECT * FROM role", function(err, res){
        if(err) throw (err)
        for(let i = 0; i < res.length; i++){
            console.table([{
                id: res[i].id,
                title: res[i].title,
                salary: res[i].salary,
                department_id: res[i].department_id,     
            }])
        }
        menu()
    })
}

function viewAllDepartments(){
    connection.query("SELECT * FROM department", function(err, res){
        if(err) throw (err)
        for(let i = 0; i < res.length; i++){
            console.table([{
                id: res[i].id,
                name: res[i].name
            }])
        }
        menu()
    })
}

async function addNewEmployee(){ //function for creating new employees 
    var firstandlast = {}
    var first = await inquirer.prompt({ //get first name from user
        type: "input",
        name: "name",
        message: "Enter the first name of the Employee you would like to add"
    })
    var last = await inquirer.prompt({ //get last name from user
        type: "input",
        name: "name",
        message: "Enter the last name of the Employee you would like to add" 
    })

    firstandlast.first = first.name 
    firstandlast.last = last.name

    await connection.query("SELECT `title`, `id` FROM role", async function(err, res){ //grabbing all roles from DB
        if(err) throw (err)
        var managerList = []
        var roleList = []
        var role = await inquirer.prompt({
            type: "list",
            name: "role",
            message: "Select the employee's position",
            choices: function(r){
                for(let i = 0; i < res.length; i++){
                    roleList.push(res[i].title)
                }
                return roleList
            }
        })
        for(let i = 0; i < res.length; i++){
            if(role.role === res[i].title){
                role.id = res[i].id
            }
        }

        await connection.query("SELECT `first_name`, `last_name`, `id` FROM employee", async function(err, res){
            if(err) throw (err)
            var manager = await inquirer.prompt({
                type: "list",
                name: "manager",
                message: "Select the employee's manager, or 'None' if the employee has none",
                choices: function(r){
                    for(let i = 0; i < res.length; i++){
                        console.log(res[i])
                        managerList.push(res[i].first_name + " " + res[i].last_name)
                    }
                    managerList.push("None")
                    return managerList
                }
            })

            for(let i = 0; i < res.length; i++){
                if(manager.manager === res[i].first_name + " " + res[i].last_name){
                    manager.id = res[i].id
                }
            }
            createEmployee(firstandlast.first, firstandlast.last, role.id, manager.id)
        })
    })

}

async function createEmployee(first, last, role, manager_id) {
    await connection.query("INSERT INTO employee SET ?",
    {
        first_name: first,
        last_name: last,
        role_id: role,
        manager_id: manager_id
    },
    function(err, res){
        if(err) throw (err)
        menu()
    })
}


async function addRole(){
    await connection.query("SELECT `name`, `id` FROM department", async function(err, res){
        if(err) throw (err)
        var departmentList = []
        var role = await inquirer.prompt([{
            type: "input",
            name: "title",
            message: "Enter the name of the new role"
        },{
            type: "input",
            name: "salary",
            message: "Enter the salary for the new role"
        },{
            type: "list",
            name: "departments",
            message: "Select the department the new role will fall under",
            choices: function(r){
                for(let i = 0; i < res.length; i++){
                    departmentList.push(res[i])
                }
                return departmentList
            }
        }])
        var depId = 0
        
        for(let i = 0; i < departmentList.length; i++){
            if(departmentList[i].name === role.departments)
            depId = departmentList[i].id
        }
        
        await connection.query("INSERT INTO role SET ?",
        {
            title: role.title,
            salary: role.salary,
            department_id: depId
        },
        function(err,res){
            if(err) throw(err)
            menu()
        } )
        
    })
}

async function addDepartment(){
    var newDep = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Enter the name of your new department"
    })
    await connection.query("INSERT INTO department SET ?",
    {
        name: newDep.name
    },
    function(err,res){
        if(err) throw (err)
        console.log(`New department ${newDep.name} Added`)
        menu()
    })
}

async function updateEmpRole(){
    await connection.query("SELECT first_name, last_name, id FROM employee", async function(err, res){
        if(err) throw (err)
        var empObj = {}
        var employeelist = []
        var employees = await inquirer.prompt({
            type: "list",
            name: "name",
            message: "Select the employee whos role you would like to update",
            choices: function(r){
                for(let i = 0; i <res.length; i ++){
                    employeelist.push(`${res[i].first_name} ${res[i].last_name}`)
                    console.log(employeelist[i])
                }
                return employeelist
            }
        })
        for(let i = 0; i < res.length; i++){
            if(employees.name === `${res[i].first_name} ${res[i].last_name}`){
                empObj.id = res[i].id
            }
        }
        console.log(empObj.id)
        await connection.query("SELECT title, id FROM role", async function(err, res){
            if(err) throw (err)
            var roleObj = {}
            var roleList = []
            var roles = await inquirer.prompt({
                type: "list",
                name: "name",
                message: "Select your employees new role",
                choices: function(r){
                    for(let i = 0; i < res.length; i++){
                        roleList.push(res[i].title)
                        console.log(roleList[i])
                    }
                    return roleList
                }
            })
            for(let i = 0; i < res.length; i ++){
                if(roles.name === res[i].title){
                    roleObj.id = res[i].id
                }
            }
            await connection.query("UPDATE employee SET ? WHERE ?",
            [{
                role_id:roleObj.id},
            {
                id: empObj.id
            }],function(err, res){
                if(err) throw(err)
                console.log(res)
                menu()
            })
        })
    })
}