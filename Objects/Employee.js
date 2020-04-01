const mysql = require("mysql");//grabbing libraries
var connection = mysql.createConnection({ //creating connection to server
  host: "localhost",

  port: 3306,

  user: "root",

  password: "root",
  database: "employee_DB"
});

function Employee(first, last, role, manager_id) {
        connection.query("INSERT INTO employee(`first_name`, `last_name`, `role_id`, `manager_id`) VALUES (" + `${first}, ${last}, ${role}, ${manager_id})`,function(err, res){
            console.log(res)
        })
}

module.exports = Employee