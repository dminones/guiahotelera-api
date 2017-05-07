// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var DestinationSchema   = new mongoose.Schema({
  	name: String,
  	description: String,
  	image: String,
	parent : { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
});

// Export the Mongoose model
module.exports = mongoose.model('Destination', DestinationSchema);