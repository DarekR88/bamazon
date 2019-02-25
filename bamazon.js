var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Chester1",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    displayProducts()
});

let productsArr = [];
let chosenItem;
let quantity;
let totalCost;
let stock;


function displayProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].product_name + " | " + "$" + res[i].price + " | " + res[i].department_name + " | " + res[i].stock_quantity + " in stock" + " | " + " ID # " + res[i].item_id)
            console.log("----------------------------------------------------------------")
            productsArr.push(res[i].product_name)
        }
        purchasePrompt()
    });
}


function purchasePrompt() {
    inquirer.prompt([
        {
            type: "list",
            name: "item",
            message: "Which item would you like to purchase?",
            choices: productsArr
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like?"
        }
    ]).then(function (res) {
        chosenItem = res.item
        quantity = res.quantity
        validatePurchase()
    });
    
}

function validatePurchase() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            if (res[i].product_name === chosenItem && res[i].stock_quantity >= quantity) {
                totalCost = quantity * res[i].price
                stock = res[i].stock_quantity - quantity
            } else if (res[i].product_name === chosenItem && res[i].stock_quantity < quantity){
                console.log("Insufficient quantity!")
            }
        }
        updateStock()
    });
}

function updateStock() {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: stock
          },
          {
            product_name: chosenItem
          }
        ],
        function(err, res) {
            if (err) throw err;
            console.log("Your total is $" + totalCost);
            connection.end();
        }
      );
}