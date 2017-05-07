// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var HotelSchema   = new mongoose.Schema({
  name: String,
  type: String,
  address: String,
  phone: String,
  email: String,
  web: String,
  _destination : { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
});


// Export the Mongoose model
module.exports = mongoose.model('Hotel', HotelSchema);