var express = require('express');
var app = express();
var settings = require('./config/settings');
var models = require('./models');

// Setup the Forest Liana middleware in your app.js file
app.use(require('forest-express-mongoose').init({
  modelsDir: __dirname + '/models', // Your models directory.
  envSecret: process.env.FOREST_ENV_SECRET,
  authSecret: process.env.FOREST_AUTH_SECRET,
  mongoose: models.mongoose // The mongoose database connection.
}));

app.set('view engine', 'ejs');  

app.get('/', function(req, res) {
	res.json({ message: 'Hello World!!' });
});

app.get('/hotel/:name', function(req, res) {
  	var hotel = new models.Hotel({ name: req.params.name });
	hotel.save(function (err) {
	  if (err) {
	  	res.json({ error: err });
	  } else {
	  	res.json(hotel);
	  }
	});
});

app.get('/hotels/',function(req, res){
  var response;
	models.Hotel.find({}).populate('_destination').exec(function(error, results){
		if (error) {
		  	response = { error: error };
		  } else {
		  	response = results;
		  }
    res.render('pages/index', response);
	});
});

app.get('/destinations/',function(req, res){
  models.Destination.find({}).exec(function(error, results){
    if (error) {
        res.json({ error: error });
      } else {
        res.json(results);
      }
  });
});

app.listen(settings.port);