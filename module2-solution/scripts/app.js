(function() {
  'use scrict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  //ToBuyController
  ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];

  function ToBuyController($scope, ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.items = ShoppingListCheckOffService.getToBuyList();
    toBuy.boughtClick = function(itemIndex) {
      ShoppingListCheckOffService.toBuyToToBought(itemIndex);
    };
  }
  //AlreadyBoughtController
  AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];

  function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
    var alreadyBought = this;
    alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtList();
  }

  //ShoppingListCheckOffService
  function ShoppingListCheckOffService() {
    var service = this;

    //To buy List
    var toBuyList = [{
      itemName: "Pasta",
      quantity: 2
    }, {
      itemName: "Tomato sauce",
      quantity: 2
    }, {
      itemName: "Cheese",
      quantity: 1
    }, {
      itemName: "Ground beef",
      quantity: 1
    }, {
      itemName: "Red wine",
      quantity: 4
    }];
    service.getToBuyList = function() {
      return toBuyList;
    };
    service.removeToBuyItem = function(indexItem) {
      return toBuyList.splice(indexItem, 1);
    };
    //Already bought List
    var alreadyBoughtList = [];
    service.getAlreadyBoughtList = function() {
      return alreadyBoughtList;
    };
    service.addItemToAlreadyBoughtList = function(item) {
      alreadyBoughtList.push(item);
    };

    //list management
    service.toBuyToToBought = function(indexItem) {
      var itemArray = service.removeToBuyItem(indexItem);
      if (itemArray.length > 0) {
        service.addItemToAlreadyBoughtList(itemArray[0]);
      }
    };

  }
})();