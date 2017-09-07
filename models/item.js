// Load required packages
var mongoose = require('mongoose')
, Schema = mongoose.Schema;

// Define our beer schema
var ItemSchema   = new Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  web: String,
  thumbnail: String,
  overview: String,
  location: Object,
  publicationType: ['NEW', 'STATUS'],
  _destination : { type: Schema.ObjectId, ref: 'Destination' },
  _category : { type: Schema.ObjectId, ref: 'Category' },
});


// Export the Mongoose model
module.exports = mongoose.model('Item', ItemSchema);