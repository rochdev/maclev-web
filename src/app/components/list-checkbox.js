(function(module) {
  'use strict';

  module.directive('listCheckbox', listCheckboxDirective);

  /**
   * @ngdoc directive
   * @name listCheckbox
   * @restrict E
   * @module maclev
   *
   * @description
   * The `listCheckbox` directive.
   */
  function listCheckboxDirective() {
    return {
      restrict: 'E',
      scope: {
        list: '=',
        value: '@'
      },
      templateUrl: 'app/components/list-checkbox.html',
      transclude: true,
      link: function postLink(scope) {
        scope.hasValue = hasValue;
        scope.toggle = toggle;

        function hasValue(value) {
          return scope.list.indexOf(value) !== -1;
        }

        function toggle(value) {
          var index = scope.list.indexOf(value);

          if (index !== -1) {
            scope.list.splice(index, 1);
          } else {
            scope.list.push(value);
          }
        }
      }
    };
  }
})(angular.module('maclev'));
