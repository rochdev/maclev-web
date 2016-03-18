(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name maclev
   * @module maclev
   *
   * @description
   * The `maclev` module.
   */
  angular
    .module('maclev', ['ngMaterial'])
    .config(function($locationProvider, $mdThemingProvider) {
      $locationProvider.html5Mode(true);

      $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('blue');
    })
    .factory('api', function($location) {
      return {
        url: $location.protocol() + '://api.' + $location.host()
      };
    })
    .run(function($rootScope, api) {
      $rootScope.api = api;
    })
    .controller('AppController', function($scope, $location, preset) {
      var vm = this;

      vm.loadUrl = loadUrl;
      vm.loadPreset = loadPreset;
      vm.createLink = createLink;
      vm.hasAddon = hasAddon;

      vm.loadPreset('clear');
      vm.loadUrl();

      // Keep URL in sync
      $scope.$watch(saveUrl);

      function saveUrl() {
        Object.keys(vm).forEach(function(key) {
          if (angular.isString(vm[key])) {
            $location.search(kebabCase(key), vm[key]);
          } else if (angular.isArray(vm[key])) {
            $location.search(kebabCase(key), vm[key].join(',') || null);
          } else {
            $location.search(kebabCase(key), null);
          }
        });
      }

      function loadUrl() {
        var search = $location.search();

        Object.keys(vm).forEach(function(key) {
          if (angular.isArray(vm[key])) {
            vm[key] = search[kebabCase(key)] ? search[kebabCase(key)].split(',') : [];
          } else if (typeof vm[key] === 'object') {
            vm[key] = search[kebabCase(key)] || null;
          }
        });
      }

      function loadPreset(name) {
        angular.extend(vm, preset.get(name));
      }

      function createLink() {
        var parts = [];

        Object.keys(vm).forEach(function(key) {
          if (angular.isString(vm[key])) {
            parts.push(kebabCase(key) + '=' + vm[key]);
          } else if (angular.isArray(vm[key])) {
            parts.push(kebabCase(key) + '=' + vm[key].join(','));
          }
        });

        return parts.join('&');
      }

      function hasAddon(name) {
        return vm.addons.indexOf(name) !== -1;
      }

      function kebabCase(str) {
        return str.replace(/([A-Z])/g, function($1) {return '-' + $1.toLowerCase();});
      }
    });
})();
