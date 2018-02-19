/**
 * Created by Rohit Tiwari.
 */
var env = require('./config.js').getEnv();
var servingDirectory = (env == "local") ? 'app' : 'dist';
var fileStyles = process.env.FILESTYLE;
if(fileStyles == "unminified")
    servingDirectory = "app";
var express = require('express');
var router = module.exports = express.Router();
var path = require('path');
var freisticRouter = require("./freistic.js");
var configJSON = require('./config.js');
var configObj = configJSON.getEnvObject();
var cookie = require('cookie');
var request = require('request-promise');

router.use('/bower_components',express.static (servingDirectory + '/bower_components'));
router.use('/css',express.static (servingDirectory + '/css'));
router.use('/controllers',express.static (servingDirectory +'/controllers'));
router.use('/views',express.static (servingDirectory +'/views'));
router.use('/',express.static (servingDirectory));
router.use(freisticRouter);
router.get(/^\/*/,serveIndex);// keep it a last route


function healthHandler (req,res) {
    res.send({"version":configObj.appVersion,"status":'up'});
}

function serveIndex (req,res) {
    res.sendFile(path.resolve('./' + servingDirectory + '/index.html'));
}