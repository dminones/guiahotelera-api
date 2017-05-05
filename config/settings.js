var environment = process.env.ENVIRONMENT_NAME || 'dev';

module.exports = require('./settings-'+ environment + '.js');
