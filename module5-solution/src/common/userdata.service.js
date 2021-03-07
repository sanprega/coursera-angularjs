(function() {
  "use strict";
  angular.module('common')
    .service('UserDataService', UserDataService);

  UserDataService.$inject = ['MenuService']

  function UserDataService(MenuService) {
    var service = this;
    // service.userData = {};

    service.saveData = function(userData) {
      service.userData = userData;
    };
    service.getUserData = function() {
      return service.userData;
    }
    service.getUserDataWithMenuItem = function() {
      MenuService.getMenuItem(service.userData.favDish).then(function(v) {
        service.userData.menuItem = v;
        return service.userData;
      }, function() {
        return service.userData;
      })

    }
  }
})();