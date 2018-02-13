const express = require('express');
const path = require('path');
const apiObject = express();
const geotaxRouter = module.exports = express.Router();
const Promise = require('bluebird');
const request = require('request-promise');
const configObj = require('./config.js').getEnvObject();
const async = require('async');

geotaxRouter.post('/beginBatchProcess', beginBatchProcessHandler);

function beginBatchProcessHandler(req, res){
	
}