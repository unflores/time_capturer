  var express  = require('express');                // Web Framework
  var app      = express();
  var mongoose = require('mongoose');               // Mongodb driver
  // Middleware
  var morgan = require('morgan');                   // Logger
  var bodyParser = require('body-parser');          // Parses Html Body
  var methodOverride = require('method-override');  // Simulate DELETE and PUT

  var database = require('./config/database');


  // Middleware Setup
  app.use(express.static(__dirname + '/public'));                 // Set location of static data
  app.use(morgan('dev'));                                         // Log requests to console
  app.use(bodyParser.urlencoded({'extended':'true'}));            // Parse extended utf urls
  app.use(bodyParser.json());                                     // Parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // Parse incoming data as json
  app.use(methodOverride());

  // DB setup
  mongoose.connect(database.url);

  require('./routes')(app);

  // Listen (start app with node server.js) ======================================
  app.listen(8080);
  console.log("App listening on port 8080");

