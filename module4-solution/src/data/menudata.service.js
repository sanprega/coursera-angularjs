(function() {
  'use strict';
  angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('apiPath', "https://davids-restaurant.herokuapp.com/");

  MenuDataService.$inject = ['$http', 'apiPath'];

  function MenuDataService($http, apiPath) {
    var service = this;

    service.getAllCategories = function() {
      return $http({
        method: "GET",
        url: (apiPath + "categories.json")
      })

    };
    service.getItemsForCategory = function(categoryShortName) {
      return $http({
        method: "GET",
        url: (apiPath + "menu_items.json"),
        params: {
          category: categoryShortName
        }
      })
    };
  }
})();