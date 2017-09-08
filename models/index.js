"use strict";

var fs       = require("fs");
var path     = require("path");
var mongoose = require('mongoose');
var settings = require('../config/settings');
var reload = require('require-reload')(require)

var authMongooseString =  (settings.mongodb.username && settings.mongodb.password) ? 
              settings.mongodb.username+':'+settings.mongodb.password+'@' : 
              '';
var connectionString = 'mongodb://'+authMongooseString+settings.mongodb.url+':'+settings.mongodb.port+'/'+settings.mongodb.name;
mongoose.connect(connectionString);

var db = {};

db['AccommodationType'] = require('./accommodation_type');
db['Destination'] = require('./destination');
db['Item'] = require('./item');

db.mongoose = mongoose;

module.exports = db;