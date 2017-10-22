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
	console.log("\nWelcome to Bamazon! Here are the items for sale: \n");
	// readstock();
	selectBuy();
	// updateProduct();
	connection.end();
});

var readstock = function() {
	queryAll();
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
	queryFruits();
	queryVegetables();
	queryMeats();
	selectBuy();
}

var selectBuy = function() {
	console.log("")
	inquirer.prompt([
	{
		type: "input",
		message: "What would you like to buy? Please enter the item's ID:",
		name: "choice"
	},
	{
		type: "input",
		message: "How many would you like to buy?",
		name: "quantity"
	}

	]).then(function(answers) {
		updateProduct();
	})
};

function updateProduct() {
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: 20
      },
      {
        item_id: 1
      }
    ],
    function(err, res) {
      console.log(res);
    }
  );
};