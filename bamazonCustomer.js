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
   
    connection.query("SELECT id, product_name, department_name, price FROM products", function(err, res) {
        if (err) throw err;
        viewer(res);
        starter();
    });
});
//====================== Ens of connection.connect =======================================
function starter(){
     inquirer.prompt([
        {
        type: 'input',
        message: 'Please Enter the number of the product: ',
        name: 'choice'
        },
         {
        type: 'input',
        message: 'How many of this product You would like to buy: ',
        name: 'qty'
        }
    ]).then(function (answers) {
        var itemId = answers.choice;
        var qty = answers.qty;
        console.log("==============================================================".cyan);
        buy(itemId, qty);
    });
};
//================================== Function buy =======================================
function buy(itemId, qty){
    connection.query("SELECT * FROM products where id=?",[itemId], function(err, res) {
        if (err) throw err;
        if (qty > res[0].stock_quantity){
            console.log("Insufficient quantity! \nOnly ".red+res[0].stock_quantity+" is available.".red);
            starter();
        }else if(qty <= res[0].stock_quantity && qty > 0){
            var newQty = parseInt(res[0].stock_quantity) - parseInt(qty);
            var newCost = (qty * res[0].price* 60 / 100).toFixed(2);
            var newSale = (qty * res[0].price).toFixed(2);
            var dept = res[0].department_name;
            console.log("  Your Invoice:".cyan.bold.italic);
            console.log("  Department: ".yellow.bold.italic+res[0].department_name+" \n  Product: ".yellow.bold.italic+res[0].product_name+" \n  Quantity: ".yellow.bold.italic+qty+" \n  Price: ".yellow.bold.italic+"$"+res[0].price+" \n  Total Price: ".yellow.bold.italic+newSale);
            console.log("==============================================================".cyan);
            updateQty(itemId, newQty);
            sales(dept, newCost, newSale);
        };
    });
};
//================================ Function updateQty ==================================
function updateQty(itemId, newQty) {
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
        }
    );
};
//================================ Function sales =============================
function sales(dept, newCost, newSale){
    connection.query("SELECT * FROM departments where department_name=?",[dept], function(err, res) {
        if (err) throw err;
        var theId = res[0].department_id;
        var costs = parseFloat(res[0].over_head_costs)+parseFloat(newCost);
        var sale = parseFloat(res[0].product_sales)+parseFloat(newCost);
        updateSales(theId, costs, sale);
});
}
//================================ Function updateSales =============================
function updateSales(theId, costs, sale) {
    
    connection.query(
        "UPDATE departments SET ?, ? WHERE ?",
        [
            {
            over_head_costs: costs
            },
            {
            product_sales: sale
            },
            {
            department_id: theId
            }
        ],
        function(err, res) {
            if (err) throw err;
        }
    );
};
//================================ Function viewer ==================================
function viewer(res){
    var values=[];
    values.push(res);
    console.log("\n   Avalable Products in BAMAZON: ".cyan.bold.italic); console.log("===============================================================".red);
    for(var i = 0; i<values.length; i++ )
    {
        console.table(values[i]);
    };
    console.log("--------------------------------------------------------------".red);
};

