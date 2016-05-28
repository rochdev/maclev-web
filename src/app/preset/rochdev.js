(function(module) {
  'use strict';

  module.config(function(presetProvider) {
    presetProvider.add('rochdev', {
      applications: [
        'discord',
        'gitter',
        'slack',
        'chrome',
        'firefox',
        'opera',
        'docker',
        'github',
        'sourcetree',
        'vagrant',
        'vmware-fusion',
        'atom',
        'sublime-text',
        'visual-studio-code',
        'intellij-idea'
      ],

      environments: [
        'node',
        'ruby',
        'python',
        'java'
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

      javaVersions: ['6', '7', '8', '9'],

      javaDefault: '8',

      javaBuildTools: ['gradle', 'maven'],

      nodeVersions: ['v6', 'v4', 'v0.12', 'v0.10'],

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

      rubyGems: ['bundler'],

      pythonVersions: ['2.7.9', '3.5.1'],

      pythonDefault: '3.5.1',

      pythonPackages: ['awscli']
    });
  });
})(angular.module('maclev'));
