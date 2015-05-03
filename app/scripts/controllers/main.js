'use strict';

angular.module('HockeyApp')

  .controller('MainCtrl', function($location, version, user) {

    var vm = this;
    vm.path = $location.path.bind($location);
    vm.version = version;
    vm.user = user;

  });
