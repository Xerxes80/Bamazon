var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require('colors');
require('console.table');
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // DB username
  user: "root",

  // DB password
  password: "000",
  database: "Bamazon_DB"
});
//====================== Start of connection.connect =====================================
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log("=============================================================================".cyan);
    
    starter();
});
//====================== Ens of connection.connect =======================================
//=========================== Function starter ===========================================
function starter(){
    inquirer.prompt([
        
        {
        type: "list",
        name: "doingWhat",
        message: "Please choose an option :",
        choices: ["View Product Sales by Department", "Create New Department"]
        }

    ]).then(function(supervisor) {
        if(supervisor.doingWhat === "View Product Sales by Department"){
            viewDepartments();
        }else if(supervisor.doingWhat === "Create New Department"){
            addNewDep();
        }
    });
};
//=========================== Function view Departments ===========================================
function viewDepartments(){
    connection.query("SELECT department_id, department_name, over_head_costs, product_sales, product_sales -over_head_costs AS Total_Profit FROM departments", function(err, res) {
        if (err) throw err; 
        console.log("=============================================================================".red);
        viewer(res);
        console.log("-----------------------------------------------------------------------------".red);
        console.log("  What would you like to do next?\n".bold.italic.cyan);
        starter();
    });
};
//=========================== Function add new Department ===========================================
function addNewDep(){
     inquirer.prompt([
        {
        type: 'input',
        message: 'Please Enter a name for the new department: ',
        name: 'deptName'
        },
        {
        type: 'input',
        message: 'Please Enter over head cost: ',
        name: 'cost'
        },
        {
        type: 'input',
        message: 'Please Enter department sales: ',
        name: 'sales'
        }
    ]).then(function (answers) {
        connection.query("INSERT INTO departments SET ?",
        {
            department_name: answers.deptName,
            over_head_costs: answers.cost,
            product_sales: answers.sales
        },
        function(err, res) {
            if (err) throw err;
            console.log("=============================================================================".red);
            console.log(res.affectedRows + "  New department Inserted Successfully!".cyan.bold.italic);
            viewDepartments();
        });
     });
}
//=========================== Function viewer ===========================================
function viewer(res){
    var values=[];
        values.push(res);
        for(var i = 0; i<values.length; i++ )
        {
            console.table(values[i]);
        };
};