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
      templateUrl : 'views/index.html'
    })
    .when('/challengeSendEmail', {
      templateUrl : 'views/challengeSendEmail.html',
      controller : 'challengeController'
    })
    .when('/challengeViewMessages', {
      templateUrl : 'views/challengeViewMessages.html',
      controller : 'challengeController'
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

// app.run(['userService', '$rootScope', '$location', function(userService, $rootScope, $location) {
//
//   userService.getIsLoggedIn()
//   .then(function(res) {
//     if (res) {
//       userService.getUser();
//     }
//
//     $rootScope.$on("$routeChangeStart", function(event, next, current) {
//       if(next.isLoggedOut && userService.isloggedin()) {
//           event.preventDefault();
//       }
//
//       // if we want them to be logged in AND they are logged out, prevent controller load
//       if(next.isLoggedIn && !userService.isloggedin()) {
//           event.preventDefault();
//       }
//     });
//   });
// }]);
