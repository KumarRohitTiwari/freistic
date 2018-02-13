
const env = require('./config.js').getEnv();
const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('file-system');
const nodeApp = express();
startLiveReloadAndNOMO(); //Comment If you Don't Want to see server Logs in Browser.
const router = require('./routes.js');
const bodyParser = require("body-parser");
const port = process.env.PORT || 5050;

let server;
function allowCrossDomain (req, res, next) {
  // response headers
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  next();
}
function startLiveReloadAndNOMO () {
  if(env === 'local'){
    require('node-monkey').start({port:600});
    nodeApp.use(require('connect-livereload')({port: 35730}));
  }
}
//nodeApp.use(allowCrossDomain);
nodeApp.use(function(req, res, next) {
    if((!req.secure) && (req.get('X-Forwarded-Proto') == 'http')) {
        res.redirect('https://' + req.get('Host') + req.url);
    }
    else
        next();
});

nodeApp.use(bodyParser.urlencoded({ extended: false }));
nodeApp.use(bodyParser.json());
nodeApp.use(router);
server = http.createServer(nodeApp);
server.listen(port);
console.log('Server Started on Port : ',port);