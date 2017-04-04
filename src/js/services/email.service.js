app.service('emailService', [function() {
  let email = {};

  function setEmails(data) {
    email = data;
  }

  function getEmails() {
    return email;
  }

  return {
    getEmails: getEmails,
    setEmails: setEmails
  };
}]);
