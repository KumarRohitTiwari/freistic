var homeController = (function () {
	return function ($scope, $window, $timeout, $stateParams, $http) {
        var self = this;
        self.firstName = 'Rohit';
        self.lastName = 'Tiwari';
        self.email = 'kumar.rohit.tiwari@gmail.com';
        self.mobile = '9650541511';
        self.password = 'iluvpushpa';
        self.type = 'transporter';
        self.errormsg = '';
        self.createAccount = function(){
            var tmpObj = {
                firstName: self.firstName,
                lastName: self.lastName,
                email: self.email,
                mobile: self.mobile,
                password: self.password,
                type: self.type
            };
            $http({
                url: '/api/v1/user/createUser',
                data: tmpObj,
                method: 'POST'
            }).then(function mySuccess(response){
                if(response.data.error == null){
                    self.errormsg = '';
                    localStorage.setItem('firstName', response.data.firstName);
                    localStorage.setItem('lastName', response.data.lastName);
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('mobile', response.data.mobile);
                    localStorage.setItem('password', response.data.password);
                    localStorage.setItem('type', response.data.type);
                    window.location.href = '/profile';
                }
                else{
                    self.errormsg = response.data.error;
                }
            });
        };
        self.loginemail = '';
        self.loginpassword = '';
        self.loginUser = function(){
            var tmpObj = {
                email: self.loginemail,
                password: self.loginpassword
            };
            $http({
                url: '/api/v1/user/loginUser',
                data: tmpObj,
                method: 'POST'
            }).then(function mySuccess(response){
                if(response.data.error == null){
                    self.errormsg = '';
                    localStorage.setItem('firstName', response.data.firstName);
                    localStorage.setItem('lastName', response.data.lastName);
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('mobile', response.data.mobile);
                    localStorage.setItem('password', response.data.password);
                    localStorage.setItem('type', response.data.type);
                    window.location.href = '/profile';
                }
                else{
                    self.errormsg = response.data.error;
                }
            });
        };
    }
})();
homeController.$inject = ["$scope", "$window", "$timeout", "$stateParams", "$http"];
app.controller("homeController", homeController);