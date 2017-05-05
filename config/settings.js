_ = require('underscore');
var environment = process.env.ENVIRONMENT_NAME || 'dev';
var envSettings = require('./settings-'+ environment);
var settings = {
	  port : process.env.PORT || 3000,
	  mongodb : {
	    url : process.env.MONGODB_URL || 'localhost',
	    name: process.env.MONGODB_DBNAME || 'hotelguia',
	    port: process.env.MONGODB_PORT ||'27017', 
	    username: process.env.MONGODB_USERNAME,
	    password: process.env.MONGODB_PASS
	  }
}
module.exports = _.extend(settings, envSettings);