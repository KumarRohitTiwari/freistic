const express = require('express');
const path = require('path');
const apiObject = express();
const freisticRouter = module.exports = express.Router();
const Promise = require('bluebird');
const request = require('request-promise');
const configObj = require('./config.js').getEnvObject();
const async = require('async');
var userService = require('./services/userService');

freisticRouter.post('/api/v1/user/createUser', userService.createUser);
freisticRouter.post('/api/v1/user/loginUser', userService.loginUser);

function createTransporterAccountHandler(req, res){
	
}