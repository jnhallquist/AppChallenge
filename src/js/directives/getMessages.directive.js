app.directive('getMessages', ['$http', 'locationService', 'challengeService', function($http, locationService, challengeService) {
  return {
    restrict: 'A',
    scope: {
    },
    link: function($scope) {
      $scope.messages = challengeService.getMessages();
    }
  };
}]);
