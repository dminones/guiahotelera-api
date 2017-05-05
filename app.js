var express = require('express');
var app = express();
var mongoose = require('mongoose');
var settings = require('./config/settings');

var authMongooseString = 	(settings.mongodb.username && settings.mongodb.password) ? 
							settings.mongodb.username+':'+settings.mongodb.password+'@' : 
							'';
var connectionString = 'mongodb://'+authMongooseString+settings.mongodb.url+':'+settings.mongodb.port+'/'+settings.mongodb.name;
console.log(connectionString);
mongoose.connect(connectionString);

var Hotel = require('./models/hotel');
// Setup the Forest Liana middleware in your app.js file
app.use(require('forest-express-mongoose').init({
  modelsDir: __dirname + '/models', // Your models directory.
  envSecret: process.env.FOREST_ENV_SECRET,
  authSecret: process.env.FOREST_AUTH_SECRET,
  mongoose: mongoose // The mongoose database connection.
}));

app.listen(settings.port)