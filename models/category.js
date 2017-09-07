// Load required packages
var mongoose = require('mongoose')
, Schema = mongoose.Schema;

// Define our schema
var CategorySchema   = new Schema({
  	name: String
}, { collection: 'categories' });

// Export the Mongoose model
module.exports = mongoose.model('Category', CategorySchema);