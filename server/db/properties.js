// Bring Mongoose into the app
var env = require("../config").getEnv();
var mongoose = require( 'mongoose' );
var Promise = require("bluebird");
mongoose.Promise = require('bluebird');

var dbURI = 'mongodb://localhost/freistic';

// Create the database connection
mongoose.connect(dbURI, {useMongoClient : true});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});


// BRING IN YOUR SCHEMAS & MODELS
// For example
//require('../model/userauth');