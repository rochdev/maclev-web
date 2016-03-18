(function(module) {
  'use strict';

  module.directive('versionPicker', versionPickerDirective);

  /**
   * @ngdoc directive
   * @name versionPicker
   * @restrict E
   * @module maclev
   *
   * @description
   * The `versionPicker` directive.
   */
  function versionPickerDirective() {
    return {
      restrict: 'E',
      scope: {
        versions: '=',
        value: '='
      },
      templateUrl: 'app/components/version-picker.html',
      link: function(scope) {
        scope.$watchCollection('versions', function(versions) {
          if (versions.length === 0) {
            scope.value = null;
          } else if (!scope.value || versions.indexOf(scope.value) === -1) {
            scope.value = versions[0];
          }
        });
      }
    };
  }
})(angular.module('maclev'));
