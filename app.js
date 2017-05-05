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

app.get('/kitty/:name', function(req, res) {
  	var kitty = new models.Hotel({ name: req.params.name });
	kitty.save(function (err) {
	  if (err) {
	  	res.json({ error: err });
	  } else {
	  	res.json(kitty);
	  }
	});
});

app.listen(settings.port);