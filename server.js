var express = require('express');
var bodyParser = require('body-parser');

// create express app
var app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}))

// parse requests of content=type - application/json
app.use(bodyParser.json())

// configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');


mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url);

mongoose.connection.on('error', function() {
   console.log('Could not connect to the db.');
   process.exit();
});

mongoose.connection.once('open', function() {
   console.log('Successfully connected to the db.');
});

// define a simple route
app.get('/', function(req, res){
   res.json({"message": "Welcome to ShelterMe App"});
});

// require shelters routes
require('./app/routes/shelter.routes.js')(app);

// listen for requests
app.listen(8080, function(){
   console.log("Server listening on port 8080");
});
