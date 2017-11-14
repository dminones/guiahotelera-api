var express = require('express');
var app = express();
var settings = require('./config/settings');
var models = require('./models');
var AWS = require('aws-sdk');
var liana = require('forest-express-mongoose');
const nodemailer = require('nodemailer');

let smtpConfig = {
    host: 'cr1.toservers.com',
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: 'consultas@guiahotelerabolivia.com',
        pass: 'ruben4910'
    }
};
let transporter = nodemailer.createTransport(smtpConfig)

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

// Setup the Forest Liana middleware in your app.js file
app.use(require('forest-express-mongoose').init({
  modelsDir: __dirname + '/models', // Your models directory.
  envSecret: process.env.FOREST_ENV_SECRET,
  authSecret: process.env.FOREST_AUTH_SECRET,
  mongoose: models.mongoose // The mongoose database connection.
}));

app.get('/', function(req, res) {
	res.json({ message: 'Hello World!' });
});

app.get('/item/',function(req, res){
  var response;
  var query = req.query;
  if( query.name )
    query.name = new RegExp(query.name, "i");

  let orderByAccomodationType = function(a,b) {
    const aOrder = a._accommodationType ? a._accommodationType.order : Number.MAX_SAFE_INTEGER;
    const bOrder = b._accommodationType ? b._accommodationType.order : Number.MAX_SAFE_INTEGER;
    
    if (aOrder < bOrder) {
      return -1;
    }
    if (bOrder < aOrder) {
      return 1;
    }
    // a must be equal to b
    return 0;
  };

  let orderByPublicationType = function(a,b) {
    let publicationTypes = {
      "Figuracion": 1,
      "Basica": 2,
      "Premium": 3,
    };

    const aPublicationOrder = publicationTypes[a.publicationType]? publicationTypes[a.publicationType] : 0;
    const bPublicationOrder = publicationTypes[b.publicationType]? publicationTypes[b.publicationType] : 0;

    if (aPublicationOrder > bPublicationOrder) {
      return -1;
    }
    if (aPublicationOrder < bPublicationOrder) {
      return 1;
    }
    // a must be equal to b
    return 0;
  };

  let orderByName = function(a,b) {
    if ( a.name < b.name)
      return -1
    if ( a.name > b.name)
      return 1
    return 0
  };

  let orderByAll = function(a,b) {
    let orders = [
      orderByPublicationType,
      orderByAccomodationType,
      orderByName
    ]

    var i = 0
    while(i < orders.length && orders[i](a,b) == 0 ) {
      i++
    }
    let index = (i < orders.length) ? i : orders.length-1
    return orders[index](a,b)
  }

  models.Item.find(query)
            .populate(['_destination', '_accommodationType'])
            .exec(function(error, results){
		if (error) {
		  	response = { error: error };
		  } else {
		  	response = results.sort(orderByAll);
		  }
    res.json(response);
	});
});


app.get('/destination/',function(req, res){
  models.Destination.find(req.query).exec(function(error, results){
    if (error) {
        res.json({ error: error });
      } else {
        res.json(results);
      }
  });
});


app.get('/item-accommodationtype/',function(req, res){

  models.Item.find(req.query)
              .populate('_accommodationType')
              .distinct('_accommodationType', null, function (err, result) {

    if (err) return handleError(err);
    models.AccommodationType.find({_id:result}).exec(function(error, results){
      if (error) return handleError(error);
      if (error) {
        res.json({ error: error });
      } else {
        res.json(results);
      }
    });
  })
});

app.get('/random-destination-image/',function(req,res){
  models.Destination.count({ image: { $ne: null } }).exec(function (err, count) {
    // Get a random entry and redirect
    var random = Math.floor(Math.random() * count)
    models.Destination.findOne({ image: { $ne: null } }).skip(random).exec(
      function (err, result) {
        res.writeHead(302, {
          'Location': result.image
        });
        res.end();
    })
  })
})

app.post('/book/',function(req, res){
  const formData = req.body
  var message = {
      from: 'consultas@guiahotelerabolivia.com',
      to: formData.to,
      subject: 'Consulta de Guia Hotelera Bolivia',
      text: `
        Ha recibido la siguiente consulta de Guia Hotelera Bolivia
        www.guiahotelerabolivia.com
        --------------------------------------------------------
        Nombre: ${formData.name}
        Email:  ${formData.email}
        Asunto:  ${formData.subject}
        Consulta:  ${formData.message}
      `,
  }
  transporter.sendMail(message, (error) => {
    if(error) {
      res.json({
        error: "No pudo enviarse el mensaje. Por favor intente más tarde"
      })
    } else {
      res.json({
        response: "Mensaje enviado con exito"
      })
    }
  })
});



app.listen(settings.port);