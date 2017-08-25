var express = require('express');
var app = express();
var settings = require('./config/settings');
var models = require('./models');
var AWS = require('aws-sdk');
var liana = require('forest-express-mongoose');

function randomFilename() {
  return require('crypto').randomBytes(48, function(err, buffer) {
    var token = buffer.toString('hex');
  });
}

function updateMovie(req, res, next) {
  //console.log(req);
  // Create the S3 client.
  var s3Bucket = new AWS.S3({ params: { Bucket: process.env.S3_BUCKET }});

  // Parse the "data" URL scheme (RFC 2397).
  var rawData = req.body.data.attributes.image;
  var base64Image = rawData.replace(/^data:image\/\w+;base64,/, '');

  // Generate a random filename.
  var filename = randomFilename();

  var data = {
    Key: filename,
    Body: new Buffer(base64Image, 'base64'),
    ContentEncoding: 'base64',
    ACL: 'public-read'
  };

  // Upload the image.
  s3Bucket.upload(data, function(err, response) {

    if (err) { 
      console.log("Error", err);
      return reject(err); 
    }
    console.log("response", response);
    // Inject the new poster URL to the params.
    req.body.data.attributes.image = response.Location;

    // Finally, call the default PUT behavior.
    next();
  });
};

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.put('/forest/destinations/:destionationId', liana.ensureAuthenticated, function(){
  console.log("holas");
});

// Setup the Forest Liana middleware in your app.js file
app.use(require('forest-express-mongoose').init({
  modelsDir: __dirname + '/models', // Your models directory.
  envSecret: process.env.FOREST_ENV_SECRET,
  authSecret: process.env.FOREST_AUTH_SECRET,
  mongoose: models.mongoose // The mongoose database connection.
}));

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
    res.json(response);
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