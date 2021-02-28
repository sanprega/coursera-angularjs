(function() {
  'use strict';
  angular.module('data')
    .component('categories', {
      templateUrl: 'src/data/templates/categories.template.html',
      bindings: {
        items: '<'
      }
    });
})();