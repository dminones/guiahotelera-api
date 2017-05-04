// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var HotelSchema   = new mongoose.Schema({
  name: String,
  rate: String,
  newValue: String
});

// Export the Mongoose model
module.exports = mongoose.model('Hotel', HotelSchema);