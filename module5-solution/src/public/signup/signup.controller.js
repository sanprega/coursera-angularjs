(function() {
  'use strict';

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['MenuService', 'UserDataService'];

  function SignUpController(MenuService, UserDataService) {
    var ctrl = this;

    ctrl.dishExists = true;
    ctrl.dataSaved = false;
    ctrl.submit = function() {
      ctrl.data.favDish = ctrl.data.favDish.toUpperCase();
      MenuService.getMenuItem(ctrl.data.favDish).then(function(v) {
          ctrl.dishExists = true;
          ctrl.saveData();
        },
        function() {
          ctrl.dishExists = false;
          ctrl.dataSaved = false;
        })

    };
    ctrl.saveData = function() {
      UserDataService.saveData(ctrl.data);
      ctrl.dataSaved = true;
    }
  }
})();