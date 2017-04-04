app.controller('challengeController', ['$scope', '$http', 'Notification', 'locationService', '$location', 'challengeService', function($scope, $http, Notification, locationService, $location, challengeService) {
  if ($location.path() == '/challengeViewMessages') {
    $scope.messages = challengeService.getMessages();
  }

  $scope.submitLoginForm = function(form) {
    if (!form) return;

    $http({
      method: 'POST',
      url: locationService.origin + '/challengeLogin',
      data: {email: $scope.email, password: $scope.password}
      })
      .then(function(res) {
        if (res.data && res.data.msg === "Verified") {
          Notification.success("Success!");
          $location.url('/challengeSendEmail');
        } else {
          Notification.error(res.data.msg);
        }
    });
  };

  $scope.sendEmail = function(form) {
    if (!form) return;

    $http({
      method: 'POST',
      url: locationService.origin + '/challengeSendEmail',
      data: {firstName: $scope.senderFirstName, lastName: $scope.senderLastName, email: $scope.email, message: $scope.message}
      })
      .then(function(res) {
        if (res.data && res.data.msg === "Email Sent!") {
          Notification.success(res.data.msg);
        } else {
          Notification.error(res.data.msg);
        }
    });
  };

  $scope.getMessages = function() {
    $http({
      method: 'GET',
      url: locationService.origin + '/challengeGetMessages'
      })
      .then(function(res) {
        if (res.data && res.data.items.length) {
          challengeService.setMessages(res.data.items);
          $location.url('/challengeViewMessages');
        } else {
          Notification.error('No messages to display. Be the first to send one now.');
        }
    });
  };
}]);
