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
    options()
});

let managerOptions = ["View products for sale", "View low inventory", "Add to inventory", "Add a new product"]
let choice;

function options() {
    inquirer.prompt([
        {
            type: "list",
            name: "mChoice",
            message: "Welcome to the Bamazon manager interface, what would you like to do today?",
            choices: managerOptions
        }
    ]).then(function (res) {
        choice = res.mChoice
        switch (choice) {
            case 'View products for sale':
                displayProducts();
                break;
            case 'View low inventory':
                lowInventory()
                break;
            case 'Add to inventory':
                break;
            case 'Add a new product':
                break;
            default:
                console.log(error);
        }
    });
}

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].product_name + " | " + "$" + res[i].price + " | " + res[i].department_name + " | " + res[i].stock_quantity + " in stock" + " | " + " ID # " + res[i].item_id)
            console.log("----------------------------------------------------------------");
        }
    });
}

function lowInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (let i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 6) {
                console.log(res[i].product_name + " | " + "$" + res[i].price + " | " + res[i].department_name + " | " + 
                res[i].stock_quantity + " in stock" + " | " + " ID # " + res[i].item_id + ' STOCK IS LOW!' )
                console.log("----------------------------------------------------------------");
            } else {
                console.log(res[i].product_name + ' | ' + res[i].stock_quantity + ' in stock, stock OK')
                console.log("----------------------------------------------------------------");
            }
        }
    });
}