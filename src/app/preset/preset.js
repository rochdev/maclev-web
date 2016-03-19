(function(module) {
  'use strict';

  module.provider('preset', PresetProvider);

  /**
   * @ngdoc provider
   * @name presetProvider
   * @kind object
   * @module maclev
   *
   * @description
   * The {@link preset} service provider.
   */
  function PresetProvider() {
    var self = this;
    var presets = {};

    // Public methods
    self.$get = $get;
    self.get = get;
    self.add = add;
    self.remove = remove;

    function $get() {
      /**
       * @ngdoc service
       * @name preset
       * @kind object
       * @module maclev
       *
       * @description
       * The `preset` service.
       */
      return {
        get: get,
        add: add,
        remove: remove
      };
    }

    function get(name) {
      return {
        applications: (presets[name].applications || []).slice(0),
        environments: (presets[name].environments || []).slice(0),
        brewFormulas: (presets[name].brewFormulas || []).slice(0),
        brewCasks: (presets[name].brewCasks || []).slice(0),
        javaVersions: (presets[name].javaVersions || []).slice(0),
        javaDefault: presets[name].javaDefault || null,
        nodeModules: (presets[name].nodeModules || []).slice(0),
        nodeVersions: (presets[name].nodeVersions || []).slice(0),
        nodeDefault: presets[name].nodeDefault || null,
        rubyGems: (presets[name].rubyGems || []).slice(0),
        rubyVersions: (presets[name].rubyVersions || []).slice(0),
        rubyDefault: presets[name].rubyDefault || null,
        pythonVersions: (presets[name].pythonVersions || []).slice(0),
        pythonPackages: (presets[name].pythonPackages || []).slice(0),
        pythonDefault: presets[name].pythonDefault || null
      };
    }

    function add(name, preset) {
      presets[name] = preset;
    }

    function remove(name) {
      delete presets[name];
    }
  }
})(angular.module('maclev'));
