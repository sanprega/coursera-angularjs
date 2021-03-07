(function() {
  "use strict";

  angular.module('common')
    .service('MenuService', MenuService);


  MenuService.$inject = ['$http', 'ApiPath'];

  function MenuService($http, ApiPath) {
    var service = this;

    service.getCategories = function() {
      return $http.get(ApiPath + '/categories.json').then(function(response) {
        return response.data;
      });
    };


    service.getMenuItems = function(category) {
      var config = {};
      if (category) {
        config.params = {
          'category': category
        };
      }

      return $http.get(ApiPath + '/menu_items.json', config).then(function(response) {
        return response.data;
      });
    };
    service.getMenuItem = function(shortName) {
      return $http.get(ApiPath + '/menu_items/' + shortName + '.json')
        .then(function(response) {
          return response.data;
        });
    };
    service.getAllItems = function() {
      var allItems = [];
      service.getCategories().then(function(data) {
        // console.log(data);
        for (var i = 0; i < data.length; i++) {
          service.getMenuItems(data[i].short_name).then(function(items) {
            for (var j = 0; j < items.menu_items.length; j++) {
              allItems.push(items.menu_items[j]);
            }
          })
        }
      });

      return allItems;
    }
  }




})();