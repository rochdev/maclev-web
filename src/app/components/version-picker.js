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
      templateUrl: 'app/components/version-picker.html'
    };
  }
})(angular.module('maclev'));
