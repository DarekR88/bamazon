DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NOT NULL,
department_name varchar(30) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("deodorant", "personal care", 6.50, 1000),
("toilet paper", "personal care", 10.00, 800),
("shampoo", "personal care", 8.00, 500),
("conditioner", "personal care", 8.00, 500),
("body wash", "personal care", 6.00, 500),
("head phones", "electronics", 30.00, 150),
("Game Station", "electronics", 350.00, 100),
("Car Stealers IV", "electronics", 59.99, 200),
("Shark Tale DVD", "electronics", 10.00, 500),
("pocket knife", "camping", 12.00, 1000),
("4 person tent", "camping", 120.00, 100),
("camp stove", "camping", 60.00, 100),
("lantern", "camping", 30.00, 250);
