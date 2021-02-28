(function() {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

      // Home page
      .state('home', {
        url: '/',
        templateUrl: 'src/data/templates/home.template.html'
      })

      .state('categories', {
        url: '/categories',
        templateUrl: 'src/data/templates/categories.template.html',
        controller: 'CategoriesController as categoriesCtrl',
        resolve: {
          items: ['MenuDataService', function(MenuDataService) {
            return MenuDataService.getAllCategories().then(function(response) {
              return response.data;
            });
          }]
        }
      })

      .state('categories.categoryitems', {
        url: '/category-items/{catID}',
        templateUrl: 'src/data/templates/items.template.html',
        controller: 'CategoryItemsController as catItemCtrl',
        resolve: {
          items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.catID).then(function(response) {
              return response.data;
            });
          }]
        }
      })
  }
})();