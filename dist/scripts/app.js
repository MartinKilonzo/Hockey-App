(function(window, document, undefined) {
  "use strict";
  angular.module("HockeyApp", [ "ngAnimate", "ngCookies", "ngRoute" ]).constant("version", "v0.0.1").constant("user", "Martin").config([ "$locationProvider", "$routeProvider", function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when("/", {
      templateUrl: "views/home.html"
    }).when("/features", {
      templateUrl: "views/features.html"
    }).when("/contact", {
      templateUrl: "views/contact.html"
    }).when("/game", {
      templateUrl: "views/game.html",
      controller: "game"
    }).when("/roster", {
      templateUrl: "views/roster.html"
    }).when("/team", {
      templateUrl: "views/team.html"
    }).when("/settings", {
      templateUrl: "views/settings.html"
    }).otherwise({
      redirectTo: "/"
    });
  } ]);
  angular.module("HockeyApp").controller("game", [ "$location", "version", "user", function($location, version, user) {
    var vm = this;
    vm.path = $location.path.bind($location);
    vm.version = version;
    vm.user = user;
  } ]);
  angular.module("HockeyApp").controller("MainCtrl", [ "$location", "version", "user", function($location, version, user) {
    var vm = this;
    vm.path = $location.path.bind($location);
    vm.version = version;
    vm.user = user;
  } ]);
  angular.module("HockeyApp").directive("ngHelloWorld", function() {
    return {
      restrict: "EAC",
      scope: true,
      compile: function compile(tElement, tAttrs) {
        tElement.html("<span>hello {{name}}</span>");
        return function postLink(scope, element, attrs, controller) {
          scope.name = "world";
        };
      }
    };
  });
  angular.module("HockeyApp").provider("config", [ "$provide", "version", function($provide, version) {
    var defaults = this.defaults = {
      debug: false,
      version: version,
      locale: "en_US",
      locales: [ {
        id: "en_US",
        name: "English"
      }, {
        id: "fr_FR",
        name: "French"
      } ]
    };
    var config = this.config = angular.copy(defaults);
    $provide.constant("$version", config.version);
    this.$get = function() {
      return config;
    };
  } ]);
  angular.module("HockeyApp").filter("time", function() {
    return function(obj) {
      return +new Date(obj);
    };
  }).filter("startFrom", function() {
    return function(obj, index) {
      return obj && obj.slice(index);
    };
  });
})(window, document);