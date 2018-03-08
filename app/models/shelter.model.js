// Shelter Schema
var mongoose = require('mongoose');

var ShelterSchema = mongoose.Schema({
   unique_key: Number,
   shelter_name: String,
   capacity: String,
   restrictions: String,
   longitude: Number,
   latitude: Number,
   address: String,
   special_notes: String,
   phone_number: String
});

module.exports = mongoose.model('Shelter', ShelterSchema);
