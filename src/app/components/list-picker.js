(function(module) {
  'use strict';

  module.component('listPicker', {
    templateUrl: 'app/components/list-picker.html',
    bindings: {
      source: '@',
      destination: '=',
      placeholder: '@',
      minLength: '@'
    },
    controller: ListPickerController
  });

  function ListPickerController($http, $timeout, $element) {
    var $ctrl = this;

    $ctrl.add = add;
    $ctrl.remove = remove;
    $ctrl.query = query;
    $ctrl.onEnter = onEnter;
    $ctrl.searchText = '';

    function onEnter() {
      !$ctrl.selectedItem && $ctrl.searchText && add($ctrl.searchText);
    }

    function add(name) {
      var $mdAutocompleteCtrl = $element.find('md-autocomplete').scope().$$childHead.$mdAutocompleteCtrl;

      if (name && $ctrl.destination.indexOf(name) === -1) {
        $ctrl.destination.push(name);
      }

      $ctrl.searchText = '';

      $timeout(function() {
        $mdAutocompleteCtrl.hidden = true;
      });
    }

    function remove(name) {
      var index = $ctrl.destination.indexOf(name);

      if (index !== -1) {
        $ctrl.destination.splice(index, 1);
      }
    }

    function query(searchText) {
      return $http.get($ctrl.source, {
        params: {
          query: searchText
        }
      }).then(function(response) {
        return response.data;
      });
    }
  }
})(angular.module('maclev'));
