var inquirer = require("inquirer");
var mysql = require ("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password:"bootcamp123",
	database: "bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
	welcome();
});

var welcome = function() {
	inquirer.prompt(
	{
		type: "list",
		message: "Welcome Manager, what would you like to do?",
		choices: [ "View Products for Sale", "View Low Inventory", "Modify Inventory", "Add New Product"],
		name: "choice"
	}).then(function(answer) {
		if (answer.choice === "View Products for Sale") {
			readstock();
		}
		if (answer.choice === "View Low Inventory") {
			inquireLowInventory();
		}
		if (answer.choice === "Modify Inventory") {
			inquireModify();
		}
		if (answer.choice === "Add New Product") {
			addProductQuery();
		}
	})
};

var readstock = function() {
	console.log("\nHere are the items for sale: \n")
	queryFruits();
	queryVegetables();
	queryMeats();
	connection.end();
};

var queryFruits = function() {
	connection.query("SELECT * FROM products WHERE department_name =?", ["Fruit"], function(err, res) {
		console.log("Fruits: ")
		for (var i = 0; i < res.length; i++) {
			console.log("  " + res[i].item_id + "." + res[i].product_name + " ||" + " Price: $" + res[i].price + " || Quantity: " + res[i].stock_quantity)
		};
		console.log("===================");
	});
};

var queryVegetables = function() {
	connection.query("SELECT * FROM products WHERE department_name =?", ["Vegetable"], function(err, res) {
		console.log("Vegetables: ")
		for (var i = 0; i < res.length; i++) {
			console.log("  " + res[i].item_id + "." + res[i].product_name + " ||" + " Price: $" + res[i].price + " || Quantity: " + res[i].stock_quantity)
		};
		console.log("===================");
	});
};

var queryMeats = function() {
	connection.query("SELECT * FROM products WHERE department_name =?", ["Meat"], function(err, res) {
		console.log("Meats: ")
		for (var i = 0; i < res.length; i++) {
			console.log("  " + res[i].item_id + "." + res[i].product_name + " ||" + " Price: $" + res[i].price + " || Quantity: " + res[i].stock_quantity)
		};
	});
};

var inquireLowInventory = function() {
	inquirer.prompt(
	{
		type: "input",
		message: "Enter item stock threshold:",
		name: "choice"
	}).then(function(answer) {
		console.log("Displaying all products that have a stock quantity lower than " + answer.choice);
		viewLowInventory(answer.choice);
	});
};

var viewLowInventory = function(arg) {
	connection.query("SELECT * FROM products WHERE stock_quantity <= " + arg, function(err, res) {
		if (res[0] === undefined) {
			console.log("No results");
		}
		for (var i = 0; i < res.length; i++) {
			console.log("  " + res[i].item_id + "." + res[i].product_name + " ||" + " Price: $" + res[i].price + " || Quantity: " + res[i].stock_quantity)
		};
	})
	connection.end();
};


var inquireModify = function() {
	inquirer.prompt([
	{
		type: "input",
		message: "Which item's stock would you like to modify? Enter item ID:",
		name: "item"
	},
	{
		type: "input",
		message: "Enter the stock quantity you would like to set the item to:",
		name: "quantity"
	}
	]).then(function(answer) {
		modifyInventory(answer.item, answer.quantity);
	})
};

var modifyInventory = function(item, quantity) {
	var query = connection.query(
		"UPDATE products SET ? WHERE ?",
		[
		{
			stock_quantity: quantity
		},
		{
			item_id: item
		}
		],
		function(err, res) {
			console.log("Successfully set item ID " + item + "'s quantity to " + quantity);
			connection.end();
		});
};

var addProductQuery = function() {
	inquirer.prompt([
	{
		type: "input",
		message: "What is the name of the product?",
		name: "name"
	},
	{
		type: "input",
		message: "What is the plural name of the product?",
		name: "pluralname"
	},
	{
		type: "input",
		message: "What department does the product belong to?",
		name: "department"
	},
	{
		type: "input",
		message: "What is the price of the product?",
		name: "price"
	},
	{
		type: "input",
		message: "What is the stock quantity of the product?",
		name: "stock"
	}
	]).then(function(answers) {
		addProduct(answers.name, answers.pluralname, answers.department, answers.price, answers.stock);
	});
};

var addProduct = function(name, pluralname, department, price, stock) {
	var query = connection.query(
		"INSERT INTO products SET ?",
		{
			product_name: name,
			product_name_plural: pluralname,
			department_name: department,
			price: price,
			stock_quantity: stock
		},
		function(err, res) {
			// console.log(res);
			connection.end();
		})
}