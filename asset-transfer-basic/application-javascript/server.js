//SPDX-License-Identifier: Apache-2.0

// nodejs server setup 

// call the packages we need
const express       = require('express'); 
// instantiate the app
const app           = express();       
const bodyParser    = require('body-parser');
const path          = require('path');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
const cors = require('cors');

// Load all of our middleware

app.use(cors());
// configure app to use bodyParser()

// app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// this line requires and runs the code from our routes.js file and passes it app
app.use('/', require("./routes"));

// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './client')));

// Save our port
const port = process.env.PORT || 8000;

// Start the server and listen on port 
app.listen(port,function(){
  console.log("Live on port: " + port);
});
