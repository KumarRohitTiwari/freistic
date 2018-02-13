/**
 * Created by Rohit Tiwari.
 */
var app = angular.module('freisticApp',['ui.router','ngResource','ngStorage','ngProgress','ui.bootstrap','ngCookies','angular-jwt','ngSanitize','rzModule','directive.loading']);

app.config(['$stateProvider','$urlRouterProvider','$locationProvider',"$httpProvider",function ($stateProvider,$urlRouterProvider,$locationProvider,$httpProvider) {
    $httpProvider.interceptors.push('AuthenticationFactory');
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");
    $stateProvider.state("blank",{
        url: "/",
        templateUrl: "views/home.html"
    })
}]);


app.run(['$rootScope','ngProgressFactory','$state','$location',function ($rootScope,ngProgressFactory,$state,$location,$sessionStorage) {
     $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
        $rootScope.progressbar = ngProgressFactory.createInstance();
        $rootScope.progressbar.start();
        $rootScope.location = $location;
     });

     $rootScope.$on('$locationChangeStart', function(event, toState, toParams, fromState, fromParams, options){
		//AuthService.checkPermission();
     });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        $rootScope.progressbar.complete();
        $rootScope.bodyClass = toState.bodyClass;
    });
	
	$rootScope.$on('$stateChangeError', function(event){
        $state.go('undefined');
    });
}]);