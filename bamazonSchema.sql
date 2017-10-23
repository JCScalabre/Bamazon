DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    product_name_plural VARCHAR (30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INT,
    stock_quantity INT,
    PRIMARY KEY (item_id)
); 
	