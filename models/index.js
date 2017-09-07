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
console.log(connectionString);
mongoose.connect(connectionString);

var db        = {};


fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = reload(path.join(__dirname, file));
    db[model.modelName] = model;
  });

db.mongoose = mongoose;

module.exports = db;