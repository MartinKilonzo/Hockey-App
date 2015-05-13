(function(window, document, undefined) {
  "use strict";
  angular.module("HockeyApp", [ "ngAnimate", "ngCookies", "ngRoute" ]).constant("version", "v0.0.1").constant("user", "Martin").constant("CLIENT_ID", "1031466315037-mri5opmcirkisus3fllv97q2oakgenfa.apps.googleusercontent.com").constant("CLIENT_SECRET", "F22W0vouWOAcKnJdL0gtgOn1").constant("REDIRECT_URL", "https://www.example.com/oauth2callback").constant("linupsToDisplay", 4).config([ "$locationProvider", "$routeProvider", function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when("/", {
      templateUrl: "views/home.html"
    }).when("/features", {
      templateUrl: "views/features.html"
    }).when("/contact", {
      templateUrl: "views/contact.html"
    }).when("/game", {
      templateUrl: "views/game.html",
      controller: "gameController"
    }).when("/roster", {
      templateUrl: "views/roster.html",
      controller: "rosterController"
    }).when("/team", {
      templateUrl: "views/team.html",
      controller: "teamController"
    }).when("/settings", {
      templateUrl: "views/settings.html",
      controller: "settingsController"
    }).otherwise({
      redirectTo: "/"
    });
  } ]);
  angular.module("HockeyApp").controller("gameController", [ "$scope", function($scope) {
    console.log("Loaded Game Controller.");
    $scope.pageClass = "page-game";
    $scope.lineups = [ "lineup 1", "lineup 2", "lineup 3", "lineup 4", "lineup 5", "lineup 6" ];
  } ]);
  angular.module("HockeyApp").controller("MainCtrl", [ "$location", "version", "user", function($location, version, user) {
    var vm = this;
    vm.path = $location.path.bind($location);
    vm.version = version;
    vm.user = user;
  } ]);
  angular.module("HockeyApp").controller("rosterPageController", [ "$scope", function($scope) {
    console.log("Loaded Roster Controller.");
    $scope.pageClass = "page-roster";
  } ]).controller("rosterController", [ "$scope", function($scope, TeamFactory, PlayerFactory) {
    console.log("Started controller roster");
    $("#warning").show();
    $("#danger").hide();
    console.log(localStorageService.keys());
    console.log("Ended controller roster");
    $("#success").show();
    $("#warning").hide();
  } ]);
  angular.module("HockeyApp").controller("settingsController", [ "$scope", function($scope) {
    console.log("Loaded Settings Controller.");
    $scope.pageClass = "page-settings";
  } ]);
  angular.module("HockeyApp").controller("teamController", [ "$scope", function($scope) {
    console.log("Loaded Team Controller.");
    $scope.pageClass = "page-team";
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
  angular.module("HockeyApp").filter("time", function() {
    return function(obj) {
      return +new Date(obj);
    };
  }).filter("startFrom", function() {
    return function(obj, index) {
      return obj && obj.slice(index);
    };
  });
  var readline = require("readline");
  var google = require("googleapis");
  var OAuth2 = google.auth.OAuth2;
  var CLIENT_ID = "1031466315037-mri5opmcirkisus3fllv97q2oakgenfa.apps.googleusercontent.com", CLIENT_SECRET = "7zF3DHS0Zr8b57LowYlxXYAj", REDIRECT_URL = "http://localhost:9000", SCOPE = "https://www.googleapis.com/auth/drive.file";
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  var auth = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
  var url = auth.generateAuthUrl({
    scope: SCOPE
  });
  var getAccessToken = function(code) {
    auth.getToken(code, function(err, tokens) {
      if (err) {
        console.log("Error while trying to retrieve access token", err);
        return;
      }
      auth.credentials = tokens;
      upload();
    });
  };
  var upload = function() {
    var drive = google.drive({
      version: "v2",
      auth: auth
    });
    drive.files.insert({
      resource: {
        title: "My Document",
        mimeType: "text/plain"
      },
      media: {
        mimeType: "text/plain",
        body: "Hello World!"
      }
    }, console.log);
  };
  console.log("Visit the url: ", url);
  rl.question("Enter the code here:", getAccessToken);
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
})(window, document);