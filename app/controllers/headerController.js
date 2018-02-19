var headerController = (function () {
	return function ($scope, $window, $timeout, $stateParams, $http) {
        var self = this;
        if(!localStorage.getItem('email')){
			window.location.href = '/';
        }
        self.logOut = function(){
            localStorage.clear();
            window.location.href = '/';
        };
    }
})();
headerController.$inject = ["$scope", "$window", "$timeout", "$stateParams", "$http"];
app.controller("headerController", headerController);