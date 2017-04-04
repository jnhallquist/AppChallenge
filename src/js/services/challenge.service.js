app.service('challengeService', [function() {
  let messages = {};

  function setMessages(data) {
    messages = data;
  }

  function getMessages() {
    return messages;
  }

  return {
    setMessages: setMessages,
    getMessages: getMessages
  };
}]);
