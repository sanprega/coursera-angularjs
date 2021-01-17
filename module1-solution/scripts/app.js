(function() {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.inputPlaceholder = "list comma separated dishes you usually have for lunch";
    $scope.message = "";

    $scope.checkItems = function() {
      var result = false;
      if ($scope.items == undefined || $scope.items == '') {
        $scope.message = "Please enter data first.";

      } else {

        var itemArray = $scope.items.split(',').filter(item => item != "");
        $scope.totalItems = itemArray.length;
        console.log($scope.totalItems);
        if (itemArray.length == 0) {

          $scope.message = "Please enter data first.";

        } else if (itemArray.length <= 3) {
          $scope.message = "Enjoy!";
          result = true;
        } else {
          $scope.message = "Too much!";
          result = true;
        }
      }
      changeClasses(result);
    }

    function changeClasses(result) {
      if (result) {
        $scope.messageclass = "result-message";
        $scope.inputclass = "good-input";
      } else {
        $scope.messageclass = "empty-message";
        $scope.inputclass = "empty-input";
      }
    }
  }
})();