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
let productsArr = [];
let chosenItem;
let quantity;

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
                lowInventory();
                break;
            case 'Add to inventory':
                addInventory();
                break;
            case 'Add a new product':
                addItem();
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
            console.log(res[i].product_name + " | " + "$" + res[i].price + " | " + res[i].department_name + " | " +
                res[i].stock_quantity + " in stock" + " | " + " ID # " + res[i].item_id)
            console.log("----------------------------------------------------------------");
        }
        connection.end();
    });
}

function lowInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (let i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 6) {
                console.log(res[i].product_name + " | " + "$" + res[i].price + " | " + res[i].department_name + " | " +
                    res[i].stock_quantity + " in stock" + " | " + " ID # " + res[i].item_id + ' STOCK IS LOW!')
                console.log("----------------------------------------------------------------");
            } else {
                console.log(res[i].product_name + ' | ' + res[i].stock_quantity + ' in stock, stock OK')
                console.log("----------------------------------------------------------------");
            }
        }
        connection.end();
    });
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (let i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 6) {
                console.log(res[i].product_name + " | " + "$" + res[i].price + " | " + res[i].department_name + " | " +
                    res[i].stock_quantity + " in stock" + " | " + " ID # " + res[i].item_id + ' STOCK IS LOW!')
                console.log("----------------------------------------------------------------");
                productsArr.push(res[i].product_name)
            } else {
                console.log(res[i].product_name + ' | ' + res[i].stock_quantity + ' in stock, stock OK')
                console.log("----------------------------------------------------------------");
                productsArr.push(res[i].product_name)
            }
        }
        inventoryPrompt()
    });
}

function inventoryPrompt() {
    inquirer.prompt([
        {
            type: "list",
            name: "item",
            message: "Which item would you like to add stock too?",
            choices: productsArr
        },
        {
            type: "input",
            name: "quantity",
            message: "How much of this item would you like to have in stock?"
        }
    ]).then(function (res) {
        chosenItem = res.item
        quantity = res.quantity
        connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: quantity
                },
                {
                    product_name: chosenItem 
                }
            ],
            function (err, res) {
                console.log(res.affectedRows + " products updated!\n");
            }
        );
        connection.end();
    });
}

function addItem() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item',
            message: 'What product would you like to add?'
        },
        {
            type: 'input',
            name: 'price', 
            message: 'What will be the price of this new item?'
        },
        {
            type: "list",
            name: "department",
            message: "What department will this product be available in?",
            choices: ['personal care', 'electronics', 'camping']
        },
        {
            type: "input",
            name: "quantity",
            message: "How much stock would you like to order?"
        }
    ]).then(function (res) {
        item = res.item;
        price = res.price
        department = res.department
        quantity = res.quantity
        connection.query(
            "INSERT INTO products SET ?",
            {
              product_name: item,
              department_name: department,
              price: price,
              stock_quantity: quantity
            },
            function(err, res) {
              if (err) throw err;
                console.log(item + ' has been added to inventory')
            }
          );
          connection.end();
    })
}