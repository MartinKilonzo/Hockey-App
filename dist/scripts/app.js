(function(window, document, undefined) {
  "use strict";
  angular.module("HockeyApp", [ "ngAnimate", "ngCookies", "ngRoute", "ui.bootstrap", "ngDragDrop", "LocalStorageModule" ]).constant("version", "v0.0.1").constant("user", "Martin").constant("CLIENT_ID", "1031466315037-mri5opmcirkisus3fllv97q2oakgenfa.apps.googleusercontent.com").constant("CLIENT_SECRET", "F22W0vouWOAcKnJdL0gtgOn1").constant("REDIRECT_URL", "https://www.example.com/oauth2callback").constant("linupsToDisplay", 4).config([ "$locationProvider", "$routeProvider", function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when("/", {
      templateUrl: "views/home.html",
      controller: "MainCtrl"
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
    }).when("/lineups", {
      templateUrl: "views/lineups.html",
      controller: "lineupsController"
    }).when("/team", {
      templateUrl: "views/team.html",
      controller: "teamController"
    }).when("/settings", {
      templateUrl: "views/settings.html",
      controller: "settingsController"
    }).otherwise({
      redirectTo: "/"
    });
  } ]).config([ "localStorageServiceProvider", function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix("ls");
  } ]).factory("TeamFactory", function TeamFactory() {
    var team = localStorageService.get("players") || [];
    var team = [];
    return {
      add: function(player) {
        this.team.push(player);
      },
      getPlayer: function(number) {
        return this.team[number];
      },
      getTeam: function() {
        return this.team;
      }
    };
  }).factory("PlayerFactory", [ "playerInfo", function(playerInfo) {
    console.log("NEW PLAYER");
    var Player = function() {
      info = playerInfo.replace(/, /g, "/").replace(/,/g, "/").split("/");
      console.log(info);
      this.firstName = info[0];
      this.lastName = info[1];
      this.playerNumber = info[2];
      this.position = info[3];
    };
    return Player;
  } ]);
  angular.module("HockeyApp").controller("gameController", [ "$scope", function($scope) {
    console.log("Loaded Game Controller.");
    $scope.pageClass = "page-game";
    $scope.lineups = [ "lineup 1", "lineup 2", "lineup 3", "lineup 4", "lineup 5", "lineup 6" ];
  } ]);
  angular.module("HockeyApp").controller("lineupsController", [ "$scope", "localStorageService", "$modal", function($scope, localStorageService, $modal, TeamFactory, PlayerFactory) {
    console.log("Started lineupsController");
    $("#warning").show();
    $("#danger").hide();
    $scope.dropToggle = false;
    var savedPlayers = localStorageService.get("players");
    var savedLineups = localStorageService.get("lineups");
    $scope.players = savedPlayers || [];
    $scope.lineups = savedLineups || [];
    $scope.$watch("lineups", function() {
      localStorageService.set("lineups", $scope.lineups);
    }, true);
    $scope.createNewLineup = function() {
      var newLineupModalInstance = $modal.open({
        animation: true,
        templateUrl: "views/partials/lineup-create.html",
        controller: "createLineupController",
        size: "lg",
        resolve: {
          players: function() {
            return $scope.players;
          }
        }
      });
      newLineupModalInstance.result.then(function(value) {
        console.log(value);
      }, function() {
        console.log("Modal Closed.");
      });
    };
    $scope.newEmptyLineup = function() {
      var newLineup = {
        name: "New Lineup",
        leftWing: "LW",
        center: "C",
        rightWing: "RW",
        defence1: "D",
        defence2: "D"
      };
      $scope.lineups.push(newLineup);
    };
    $scope.rename = function(index) {
      console.log($scope.newTitle);
      if ($scope.newTitle) {
        $scope.lineups[index].name = $scope.newTitle;
        console.log($scope.lineups[index].name);
      }
      $scope.newTitle = "";
    };
    console.log("Ended lineupsController");
    $("#success").show();
    $("#warning").hide();
  } ]).controller("createLineupController", [ "$scope", "players", function($scope, $newLineupModalInstance, players) {
    $scope.createNew = function() {
      console.log("Create new lineup");
      $newLineupModalInstance.$close();
    };
  } ]);
  angular.module("HockeyApp").controller("MainCtrl", [ "$location", "version", "user", function($location, version, user) {
    var vm = this;
    vm.path = $location.path.bind($location);
    vm.version = version;
    vm.user = user;
    var mouseOverTimeout;
    var menu;
    $(".dropdown").mouseenter(function() {
      menu = $(this).children(".dropdown-menu");
      mouseOverTimeout = setTimeout(function() {
        menu.show(400);
      }, 400);
    }).mouseleave(function() {
      clearTimeout(mouseOverTimeout);
      menu.delay(400).hide(300);
    });
  } ]);
  angular.module("HockeyApp").controller("rosterPageController", [ "$scope", function($scope) {
    console.log("Loaded Roster Controller.");
    $scope.pageClass = "page-roster";
  } ]).controller("rosterController", [ "$scope", "localStorageService", function($scope, localStorageService, TeamFactory, PlayerFactory) {
    console.log("Started controller roster");
    $("#warning").show();
    $("#danger").hide();
    var savedPlayers = localStorageService.get("players");
    $scope.players = savedPlayers || [];
    $scope.$watch("players", function() {
      localStorageService.set("players", $scope.players);
    }, true);
    $scope.addPlayer = function() {
      if ($scope.playerInfo) {
        var info = $scope.playerInfo.replace(/, /g, "/").replace(/,/g, "/").split("/");
        var validPlayer = true;
        for (var i = 3; i >= 0; i--) {
          if (!info[i]) {
            validPlayer = false;
          }
        }
        var newPlayer = {
          firstName: info[0],
          lastName: info[1],
          playerNumber: parseInt(info[2]),
          position: info[3]
        };
        var playerExists = false;
        for (var i = $scope.players.length - 1; i >= 0; i--) {
          if ($scope.players[i].lastName === newPlayer.lastName && $scope.players[i].firstName === newPlayer.firstName) {
            playerExists = true;
          }
        }
        if (!validPlayer || playerExists) {
          !validPlayer ? alert("Invalid Entry.") : alert("The player already exists on the roster.");
        } else {
          $scope.players.push(newPlayer);
          var addedMessage = "Added " + newPlayer.firstName + " " + newPlayer.lastName;
          console.log(addedMessage);
        }
        $scope.playerInfo = "";
      }
    };
    $scope.removePlayer = function(index) {
      var removedPlayer = $scope.players[index];
      var removedMessage = "Removed " + removedPlayer.firstName + " " + removedPlayer.lastName;
      $scope.players.splice(index, 1);
      console.log(removedMessage);
    };
    $scope.getInfo = function(index) {
      var player = $scope.players[index];
      return "#" + player.playerNumber + " " + player.firstName.charAt(0) + "." + player.lastName + ": " + player.position;
    };
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
  angular.module("HockeyApp").directive("showDropdown", function() {
    return {
      restrict: "EAC",
      link: function(scope, elemeent, attrs) {}
    };
  });
  angular.module("HockeyApp").directive("lineupTemplate", function() {
    return {
      restrict: "E",
      templateUrl: "views/partials/lineup-template.html"
    };
  }).directive("lineupPlayerPool", function() {
    return {
      restrict: "E",
      templateUrl: "views/partials/lineup-player-pool.html"
    };
  }).directive("lineupCreate", function() {
    return {
      restrict: "E",
      templateUrl: "views/partials/lineup-create.html"
    };
  });
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
  angular.module("HockeyApp").directive("rosterPlayer", function() {
    return {
      restrict: "E",
      templateUrl: "views/partials/roster-player.html"
    };
  }).directive("rosterInput", function() {
    return {
      restrict: "E",
      templateUrl: "views/partials/roster-input.html"
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