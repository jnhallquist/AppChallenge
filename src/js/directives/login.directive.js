app.directive('login', ['$http', '$location', 'Notification', 'userService', function($http, $location, Notification, userService) {
  return {
    restrict: 'E',
    scope: {
    },
    templateUrl: 'views/login.html',
    link: function($scope) {
      $scope.submitLoginForm = function(form) {
        if (!form) return;

        $http({
          method: 'POST',
          url: `${Window.apiLocation}/login`,
          data: {email: $scope.email, password: $scope.password}
          })
          .then(function(res) {
            if (res.data && res.data._id) {
              Notification.success("Success!");
              userService.setId(res.data._id);
              $location.url('/email');
            } else {
              Notification.error("Incorrect Login Credentials");
            }
        });
      };
    }
  };
}]);
