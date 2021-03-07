(function() {
  'use strict';

  angular.module('public')
    .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['userData', 'MenuService'];

  function MyInfoController(userData, MenuService) {
    var ctrl = this;
    ctrl.userData = userData;
    if (userData != undefined) {
      MenuService.getMenuItem(ctrl.userData.favDish).then(function(v) {
        ctrl.menuItem = v;
      }, function() {

      })
    }
  }
})();