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
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory","Add New Product"]
        }

    ]).then(function(manager) {
        if(manager.doingWhat === "View Products for Sale"){
            console.log("\n   Avalable Products: ".cyan.bold.italic); 
            viewProducts();
        }else if(manager.doingWhat === "View Low Inventory"){
            lowInventory();
        }else if(manager.doingWhat === "Add to Inventory"){
            addInventory();
        }else if(manager.doingWhat === "Add New Product"){
            addProduct();
        };
    });
};
//====================== Function viewProducts =======================================
function viewProducts(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err; 
        console.log("===============================================================".red);
        viewer(res);
        console.log("---------------------------------------------------------------".red);
        console.log("  What would you like to do next?\n".bold.italic.cyan);
        starter();
    });
};
//====================== Function viewer =======================================
function viewer(res){
    var values=[];
        values.push(res);
        for(var i = 0; i<values.length; i++ )
        {
            console.table(values[i]);
        };
};
//====================== Function lowInventory =======================================
function lowInventory(){
    connection.query("SELECT * FROM products where stock_quantity<5", function(err, res) {
        if (err) throw err;
        console.log("\n   Low Inventory Products: ".cyan.bold.italic); console.log("===============================================================".red);
        viewer(res);
        console.log("---------------------------------------------------------------".red);
        console.log("  What would you like to do next?\n".bold.italic.cyan);
        starter();
    });
};
//====================== Function addInventory =======================================
function addInventory(){
    inquirer.prompt([
        {
        type: 'input',
        message: 'Please Enter the number of the product: ',
        name: 'choice'
        },
         {
        type: 'input',
        message: 'How many of this product to Add: ',
        name: 'qty'
        }
    ]).then(function (answers) {
        var itemId = answers.choice;
        var qty = answers.qty;
        console.log("==============================================================".cyan);
        connection.query("SELECT stock_quantity FROM products where id=?",[itemId], function(err, res) {
        if (err) throw err;
        var newQty = parseInt(res[0].stock_quantity) + parseInt(qty);
        updateInventory(itemId, qty, newQty);
        });
        
    });
};
//====================== Function updateInventory =======================================
function updateInventory(itemId, qty, newQty){
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
            stock_quantity: newQty
            },
            {
            id: itemId
            }
        ],
        function(err, res) {
            if (err) throw err;
            console.log("  Successfully Added To The Inventory.".cyan.bold.italic);
            viewProducts();
        }
    );
};
//====================== Function addProduct =======================================
function addProduct(){
    inquirer.prompt([
        {
        type: 'input',
        message: 'Please Enter the product name: ',
        name: 'name'
        },
        {
        type: 'input',
        message: 'Please Enter the product Department: ',
        name: 'dept'
        },
        {
        type: 'input',
        message: 'Please Enter the product price: ',
        name: 'price'
        },
        {
        type: 'input',
        message: 'Please Enter the product Quantity: ',
        name: 'qty'
        }
    ]).then(function (answers) {
            console.log("==============================================================".red);
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answers.name,
                    department_name: answers.dept,
                    price: answers.price,
                    stock_quantity: answers.qty
                },
                function(err, res) {
                    if(err) throw err; 
                    console.log(res.affectedRows + "  Product Inserted Successfully!".cyan.bold.italic);
                    viewProducts();  
                }
            );
    }); 
};
