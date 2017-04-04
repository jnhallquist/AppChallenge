app.directive('login', ['$http', 'challengeService', function($http, challengeService) {
  return {
    restrict: 'E',
    scope: {
    },
    templateUrl: 'views/login.html',
    link: function($scope) {

    }
  };
}]);
