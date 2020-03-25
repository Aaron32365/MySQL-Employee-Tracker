const mysql = require("mysql");
var connection = mysql.createConnection({ //creating server
  host: "localhost",

  port: 3306,

  user: "root",

  password: "root",
  database: "employee_DB"
});

function view(res){
  console.log(res)
}

// function allEmployees() {
//     connection.query("SELECT * FROM employee", function(err, res) { //grabbing all employees from DB
//         if(err) throw (err)
//         console.log("hi")
//         //     for(let i = 0; i < res.length; i++){
//         //         console.table([{
//         //         id: res[i].id,
//         //         first_name: res[i].first_name,
//         //         last_name: res[i].last_name,
//         //         role_id: res[i].role_id,        //change to department, salary, and manager
//         //         manager_id: res[i].manager_id
//         //     }])
//         // }
//     })
// }
// module.exports = allEmployees();
module.exports = view