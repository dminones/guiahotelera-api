_ = require('underscore');
var environment = process.env.ENVIRONMENT_NAME || 'dev';
var envSettings;
try {
    // the synchronous code that we want to catch thrown errors on
    envSettings = require('./settings-'+ environment);
} catch (err) {
    // handle the error safely
    envSettings = {};
    console.log(err);
}

var settings = {
	  port : process.env.PORT || 9000,
	  mongodb : {
	    url : process.env.MONGODB_URL || 'localhost',
	    name: process.env.MONGODB_DBNAME || 'hotelguia',
	    port: process.env.MONGODB_PORT ||'27017', 
	    username: process.env.MONGODB_USERNAME,
	    password: process.env.MONGODB_PASS
	  }
}
module.exports = _.extend(settings, envSettings);