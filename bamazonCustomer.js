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
		message: "Welcome to Bamazon, what would you like to do?",
		choices: ["See what's for sale", "Buy an item"],
		name: "choice"
	}).then(function(answer) {
		if (answer.choice === "See what's for sale") {
			readstock();
		}
		if (answer.choice === "Buy an item") {
			selectBuy();
		}
	})
}

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

var selectBuy = function() {
	console.log("")
	inquirer.prompt([
	{
		type: "input",
		message: "What would you like to buy? Please enter the item's ID:",
		name: "choice"
	}
	,
	{
		type: "input",
		message: "How many would you like to buy?",
		name: "quantity"
	}

	]).then(function(answers) {
		var product_ids = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
		if (product_ids.indexOf(answers.choice) === -1) {
			console.log("Error: Please enter a valid product ID.");
			selectBuy();
		} else {
			readQuantity(answers.choice, answers.quantity);
		}
	});
};

var readQuantity = function(item, quantityDesired) {
	var query = connection.query(
		"SELECT stock_quantity, product_name_plural, price FROM products WHERE ?",
		[
		{
			item_id: item
		}
		],
		function(err, res) {
			if (err) throw err;
			if ((res[0].stock_quantity - quantityDesired) < 0) {
				console.log("Sorry! We do not have " +  quantityDesired + " " + res[0].product_name_plural + " in stock. Please enter a smaller amount.");
				selectBuy();
			} else {
				updateProduct(item, res[0].stock_quantity - quantityDesired);
				console.log("Successfully bought " + quantityDesired + " " + res[0].product_name_plural + " for " + "$" + res[0].price*quantityDesired + ".");
				console.log("There are " + (res[0].stock_quantity - quantityDesired) + " " + res[0].product_name_plural + " left in stock.");
			}
		});
};

var updateProduct = function(item, qty) {

	var query = connection.query(
		"UPDATE products SET ? WHERE ?",
		[
		{
			stock_quantity: qty
		},
		{
			item_id: item
		}
		],
		function(err, res) {

		}
		);
	connection.end();
};

