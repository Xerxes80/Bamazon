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
    console.log("===============================================================".cyan);
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
//            console.log("\n   Avalable Products: ".cyan.bold.italic); 
//            viewProducts();
        }else if(supervisor.doingWhat === "Create New Department"){
//            lowInventory();
        }
    });
};