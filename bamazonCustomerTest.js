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
	run();
});

var run = function() {
	readstock();
}

var readstock = function() {
	console.log("\nHere are the items for sale: \n")
	queryAll();
	// queryFruits();
	// queryVegetables();
	// queryMeats();
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

var queryAll = function() {
	connection.query("SELECT * FROM products", function(err, res) {
		
		var choicesArr = [];
		for (var i = 0; i < res.length; i++) {
			choicesArr.push("  " + res[i].item_id + "." + res[i].product_name + " ||" + " Price: $" + res[i].price + " || Quantity: " + res[i].stock_quantity)
		};

		inquirer.prompt(
		{
			type: "list",
			message: "Select the item you would like to buy",
			choices: choicesArr,
			name: "choice"
		}).then(function(answers) {
			console.log(answers.choice)
			if (answers.choice === choicesArr[0]) {
				console.log("You chose apple")
			}
		})
	})
}