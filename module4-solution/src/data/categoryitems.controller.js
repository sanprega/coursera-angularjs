(function() {
  'use strict';

  angular.module('MenuApp')
    .controller('CategoryItemsController', CategoryItemsController);

  CategoryItemsController.$inject = ['MenuDataService', 'items'];

  function CategoryItemsController(MenuDataService, items) {
    var categoriesCtrl = this;
    categoriesCtrl.items = items;
    console.log(categoriesCtrl.items);
  }
})();