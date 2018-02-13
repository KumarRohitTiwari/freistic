/**
* @preserve Created by Rohit Tiwari.
*/
app.service("UserService",["$http","$sessionStorage","$stateParams",function ($http,$sessionStorage,$stateParams) {
	this.loadUserData = function () {
		var userData = angular.copy($sessionStorage.userData);
		return userData;
	};
}]);

app.factory('AuthenticationFactory',['$window','$q', function ($window,$q) {
	var factoryObj = {};
	factoryObj.response = function (config) {
		return config;
	};
	factoryObj.request = function (config) {
		return config;
	};
	factoryObj.responseError = function (errorResponse) {
		switch(errorResponse.status){
			case 403 :
				break;
		}
		return $q.resolve(errorResponse);
	};
	return factoryObj;
}]);

app.factory("TokenFactory",["jwtHelper","$cookies",function (jwtHelper,$cookies) {
	var factory = {};
	var userJWT = null;
	var userDetails = null;
	factory.getUserJWT = function () {
		userJWT = $cookies.get('authorisedUser');
		return userJWT;
	};
	factory.checkTokenExpiration = function () {
		if(userJWT){
			console.log("***********",jwtHelper.isTokenExpired(userJWT));
			return jwtHelper.isTokenExpired(userJWT);
		}else{
			return "not exists";
		}
	};
	factory.decodeToken = function () {
		if(userJWT){
			userDetails = jwtHelper.decodeToken(userJWT);
		}
	};
	factory.getUserInfo = function () {
		return userDetails;
	};
	return factory;
}]);