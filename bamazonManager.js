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

function options() {
    inquirer.prompt([
        {
            type: "list",
            name: "mChoice",
            message: "Welcome to the Bamazon manager interface, what would you like to do today?",
            choices: managerOptions
        }
    ]).then(function (res) {
       
    });
}