var app = angular.module('challengeApp', [
  'ngRoute',
  'ngMaterial',
  'ngAnimate',
  'templateCache',
  'ui-notification'
]);

app.config(['$routeProvider', '$locationProvider', 'NotificationProvider', '$mdThemingProvider', '$httpProvider', function($routeProvider, $locationProvider, NotificationProvider, $mdThemingProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './index.html'
    })
    .when('/email', {
      templateUrl : 'views/email.html',
      controller : 'emailController'
    })
    .when('/emails', {
      templateUrl : 'views/emails.html',
      controller : 'emailController'
    })
    .otherwise({
      redirectTo: '/'
    });

    NotificationProvider.setOptions({
        delay: 10000,
        startTop: 20,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'bottom'
    });

  $locationProvider.html5Mode(true);

  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('pink');

  $httpProvider.useApplyAsync(true);
}]);

app.run([function() {
  Window.apiLocation = 'http://localhost:8000';
}]);
