(function(module) {
  'use strict';

  module.config(function(presetProvider) {
    presetProvider.add('rochdev', {
      addons: [
        'discord',
        'gitter',
        'slack',
        'chrome',
        'firefox',
        'opera',
        'docker',
        'github',
        'vagrant',
        'atom',
        'sublime-text',
        'visual-studio-code',
        'intellij-idea',
        'node',
        'ruby'
      ],

      brewFormulas: [
        'bash-git-prompt',
        'hub',
        'mongodb',
        'postgresql',
        'gemnasium-toolbelt',
        'heroku-toolbelt',
        'cf-cli'
      ],

      brewCasks: [],

      nodeVersions: ['v5', 'v4', 'v0.12', 'v0.10'],

      nodeDefault: 'v4',

      nodeModules: [
        'babel-cli',
        'bower',
        'cordova',
        'cucumber',
        'forever',
        'grunt-cli',
        'gulp',
        'karma',
        'mocha',
        'mversion',
        'protractor',
        'selenium-standalone',
        'tinto',
        'yo'
      ],

      rubyVersions: ['2.3.0', '1.9.3-p551'],

      rubyDefault: '2.3.0',

      rubyGems: ['bundler']
    });
  });
})(angular.module('maclev'));
