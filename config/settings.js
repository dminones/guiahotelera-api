_ = require('underscore');
var environment = process.env.ENVIRONMENT_NAME || 'dev';
var envSettings = require('./settings-'+ environment);
var settings = {
	  port : process.env.PORT || 3000,
	  mongodb : {
	    url : 'localhost',
	    name: 'hotelguia',
	    port: '27017'
	  }
}
module.exports = _.extend(settings, envSettings);
