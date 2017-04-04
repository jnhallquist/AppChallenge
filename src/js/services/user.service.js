app.service('userService', [function() {
  let id = null;

  function setId(userid) {
    id = userid;
  }

  function getId() {
    return id;
  }

  return {
    getId : getId,
    setId : setId
  };
}]);
