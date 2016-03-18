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
      vm.toggle = toggle;

      vm.loadUrl();

      $scope.$watch(function() {
        $location.search('addons', vm.addons.join(',') || null);
        $location.search('brew-formulas', vm.brewFormulas.join(',') || null);
        $location.search('brew-casks', vm.brewCasks.join(',') || null);
        $location.search('java-versions', vm.javaVersions.join(',') || null);
        $location.search('java-default', vm.javaDefault || null);
        $location.search('node-versions', vm.nodeVersions.join(',') || null);
        $location.search('node-modules', vm.nodeModules.join(',') || null);
        $location.search('node-default', vm.nodeDefault || null);
        $location.search('ruby-versions', vm.rubyVersions.join(',') || null);
        $location.search('ruby-default', vm.rubyDefault || null);
        $location.search('ruby-gems', vm.rubyGems.join(',') || null);
        $location.search('python-versions', vm.pythonVersions.join(',') || null);
        $location.search('python-default', vm.pythonDefault || null);
        $location.search('python-packages', vm.pythonPackages.join(',') || null);
      });

      watchVersions('java');
      watchVersions('node');
      watchVersions('ruby');
      watchVersions('python');

      function loadUrl() {
        var search = $location.search();

        vm.addons = search['addons'] ? search['addons'].split(',') : [];
        vm.brewFormulas = search['brew-formulas'] ? search['brew-formulas'].split(',') : [];
        vm.brewCasks = search['brew-casks'] ? search['brew-casks'].split(',') : [];
        vm.javaVersions = search['java-versions'] ? search['java-versions'].split(',') : [];
        vm.javaDefault = search['java-default'] ? search['java-default'] : null;
        vm.nodeVersions = search['node-versions'] ? search['node-versions'].split(',') : [];
        vm.nodeModules = search['node-modules'] ? search['node-modules'].split(',') : [];
        vm.nodeDefault = search['node-default'] ? search['node-default'] : null;
        vm.rubyVersions = search['ruby-versions'] ? search['ruby-versions'].split(',') : [];
        vm.rubyGems = search['ruby-gems'] ? search['ruby-gems'].split(',') : [];
        vm.rubyDefault = search['ruby-default'] ? search['ruby-default'] : null;
        vm.pythonVersions = search['python-versions'] ? search['python-versions'].split(',') : [];
        vm.pythonPackages = search['python-packages'] ? search['python-packages'].split(',') : [];
        vm.pythonDefault = search['python-default'] ? search['python-default'] : null;
      }

      function loadPreset(name) {
        angular.extend(vm, preset.get(name));
      }

      function createLink() {
        var parts = [];

        parts.push('addons=' + vm.addons.join(','));
        parts.push('brew-formulas=' + vm.brewFormulas.join(','));
        parts.push('brew-casks=' + vm.brewCasks.join(','));
        parts.push('java-versions=' + vm.javaVersions.join(','));
        parts.push('java-default=' + (vm.javaDefault || ''));
        parts.push('node-versions=' + vm.nodeVersions.join(','));
        parts.push('node-default=' + (vm.nodeDefault || ''));
        parts.push('node-modules=' + vm.nodeModules.join(','));
        parts.push('python-versions=' + vm.pythonVersions.join(','));
        parts.push('python-default=' + (vm.pythonDefault || ''));
        parts.push('python-packages=' + vm.pythonPackages.join(','));
        parts.push('ruby-versions=' + vm.rubyVersions.join(','));
        parts.push('ruby-default=' + (vm.rubyDefault || ''));
        parts.push('ruby-gems=' + vm.rubyGems.join(','));

        return parts.join('&');
      }

      function hasAddon(name) {
        return vm.addons.indexOf(name) !== -1;
      }

      function toggle(collection, item) {
        var index = collection.indexOf(item);

        if (index !== -1) {
          collection.splice(index, 1);
        } else {
          collection.push(item);
        }
      }

      function watchVersions(language) {
        $scope.$watchCollection('vm.' + language + 'Versions', function(versions) {
          if (versions.length === 0) {
            vm[language + 'Default'] = null;
          } else if (!vm[language + 'Default'] || versions.indexOf(vm[language + 'Default']) === -1) {
            vm[language + 'Default'] = versions[0];
          }
        });
      }
    });
})();
