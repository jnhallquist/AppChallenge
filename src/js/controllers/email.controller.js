app.controller('emailController', ['$scope', '$http', 'Notification', '$location', 'emailService', 'userService',
function($scope, $http, Notification, $location, emailService, userService) {
  $scope.emailService = emailService;

  $scope.sendEmail = function(form) {
    if (!form) return;
    $http({
      method: 'POST',
      url: `${Window.apiLocation}/email`,
      data: {
              sender_first_name: $scope.senderFirstName,
              sender_last_name : $scope.senderLastName,
              recipient        : $scope.email,
              message          : $scope.message,
              user_id          : userService.getId()
            }
      })
      .then(function(res) {
        if (res.data.post && res.data.post._id) {
          Notification.success("Email Sent!");
        } else {
          Notification.error("An Error Has Occured.");
        }
    });
  };

  $scope.getEmails = function() {
    $http({
      method: 'POST',
      url: `${Window.apiLocation}/emails`,
      data: {
        user_id: userService.getId()
      }
    })
    .then(function(res) {
      if (res.data && res.data.emails) {
        emailService.setEmails(res.data.emails);
        $location.url('/emails');
      } else {
        Notification.error('No messages to display. Be the first to send one now.');
      }
    });
  };
}])
