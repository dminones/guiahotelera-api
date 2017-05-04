// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));


// Initial dummy route for testing
// http://localhost:3000/api
app.get('/', function(req, res) {
  res.json({ message: 'App running' });
});

var Hotel = require('./models/hotel');

mongoose.connect('mongodb://localhost:27017/myproject');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 
	// Initial dummy route for testing
	// http://localhost:3000/api
	app.get('/kitty/:name', function(req, res) {
	  	var kitty = new Hotel({ name: req.params.name });
		kitty.save(function (err) {
		  if (err) {
		  	res.json({ error: err });
		  } else {
		  	res.json(kitty);
		  }
		});
	});
});

app.listen(3000);