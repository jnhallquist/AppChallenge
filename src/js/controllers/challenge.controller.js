app.controller('challengeController', ['$scope', '$location', 'emailService', function($scope, $location, emailService) {
  if ($location.path() == '/emails') {
    $scope.emails = emailService.getEmails();
  }
}]);
