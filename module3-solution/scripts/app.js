(function() {
  'use strict';
  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownAppController', NarrowItDownAppController)
    .service('MenuSearchService', MenuSearchService)
    .constant('apiPath', "https://davids-restaurant.herokuapp.com/")
    .directive('foundItems', FoundItems);

  NarrowItDownAppController.$inject = ['$scope', 'MenuSearchService'];
  function NarrowItDownAppController($scope, MenuSearchService) {
    var narrow = this;

    narrow.searchTerm = "";
    narrow.clickButton = function() {
      if (narrow.searchTerm === undefined || narrow.searchTerm === null || narrow.searchTerm === "") {
        narrow.items = [];
      } else {
        var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
        promise.then(function(response) {
            narrow.items = response;
            narrow.item_number = narrow.items.lenght;
          })
          .catch(function(error) {
            console.log(error);
          })
      }
    };
    narrow.removeItem = function(index) {
      narrow.items.splice(index, 1);
    };
    narrow.checkList = function() {
      return typeof narrow.items !== 'undefined' && narrow.items.length === 0
    }
  }
  MenuSearchService.$inject = ['$http', 'apiPath']

  function MenuSearchService($http, apiPath) {
    var service = this;
    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
          method: "GET",
          url: (apiPath + "/menu_items.json")
        })
        .then(function(result) {
          // process result and only keep items that match
          var foundItems = [];

          foundItems = result.data.menu_items.filter(x => x.description.toLowerCase().includes(searchTerm.toLowerCase()))
          // return processed items
          return foundItems;
        });
    }
  }

  function FoundItems() {
    var ddo = {
      templateUrl: 'foundList.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: NarrowItDownAppController,
      controllerAs: 'narrow',
      bindToController: true
    };
    return ddo;
  }
})();
