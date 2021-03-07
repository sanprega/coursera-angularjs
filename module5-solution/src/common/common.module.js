(function() {
  "use strict";

  angular.module('common', [])
    .constant('ApiPath', 'https://tranquil-fortress-68815.herokuapp.com')
    .config(config);

  config.$inject = ['$httpProvider'];

  function config($httpProvider) {
    $httpProvider.interceptors.push('loadingHttpInterceptor');
  }

})();