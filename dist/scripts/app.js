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
  angular.module("HockeyApp").controller("gameController", [ "$scope", "$log", "localStorageService", function($scope, $log, localStorageService) {
    console.log("Loaded Game Controller.");
    $scope.pageClass = "page-game";
    var savedPlayers = localStorageService.get("players");
    var savedLineups = localStorageService.get("lineups");
    var savedActivePlayers = localStorageService.get("activePlayers");
    $scope.players = savedPlayers || [];
    $scope.lineups = savedLineups || [];
    $scope.activePlayers = savedActivePlayers || [];
    $scope.resetSelection = function() {};
    $scope.setSelectedPosition = function(selection) {
      $scope.positionSelection = selection;
    };
    $scope.test = function(value) {
      action(value, function(value) {
        $scope.testVal = value;
      });
    };
    var action = function(oldVal, applier) {
      this.oldval = oldVal;
      this.newVal = function(oldVal) {
        return oldVal + 1;
      };
      this.applier = applier;
    };
    action.prototype.execute = function() {
      this.applier(this.newVal);
      $log.info($scope.testVal);
    };
    action.prototype.unExecute = function() {
      this.applier(this.oldval);
      $log.info($scope.testVal);
    };
    $scope.setHover = function(index) {
      $scope.hover = index;
    };
    $scope.setLineupSelection = function(selection) {
      $scope.lineupSelection = selection;
    };
    $scope.swapLineup = function(index) {
      $scope.activePlayers[0] = $scope.lineups[index].leftWing;
      $scope.activePlayers[1] = $scope.lineups[index].center;
      $scope.activePlayers[2] = $scope.lineups[index].rightWing;
      $scope.activePlayers[3] = $scope.lineups[index].defence1;
      $scope.activePlayers[4] = $scope.lineups[index].defence2;
    };
    $scope.lineupSelected = function(index) {
      var selectedLineup = true;
      var lineup = [];
      lineup[0] = $scope.lineups[index].leftWing;
      lineup[1] = $scope.lineups[index].center;
      lineup[2] = $scope.lineups[index].rightWing;
      lineup[3] = $scope.lineups[index].defence1;
      lineup[4] = $scope.lineups[index].defence2;
      if (!$scope.activePlayers[0]) selectedLineup = false;
      for (var j = 0; j < $scope.activePlayers.length; j++) {
        if (!$scope.activePlayers[j] || lineup[j].playerNumber !== $scope.activePlayers[j].playerNumber) {
          selectedLineup = false;
          break;
        }
      }
      return selectedLineup;
    };
    $scope.swapPlayer = function(index) {
      $scope.activePlayers[$scope.positionSelection] = $scope.players[index];
    };
    $scope.playerSelected = function(index) {
      var player = $scope.players[index];
      var playerSelected = false;
      for (var i = 0; i < $scope.activePlayers.length; i++) {
        var activePlayer = $scope.activePlayers[i];
        if (activePlayer && player.playerNumber === activePlayer.playerNumber) {
          playerSelected = true;
          break;
        }
      }
      return playerSelected;
    };
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
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: "views/partials/lineup-create.html",
        controller: "createLineupController",
        size: "lg",
        resolve: {
          players: function() {
            return $scope.players;
          },
          lineup: function() {
            if ($scope.editLineupIndex >= 0) {
              return $scope.lineups[$scope.editLineupIndex];
            } else {
              return undefined;
            }
          }
        }
      });
      modalInstance.result.then(function(newLineup) {
        console.log(newLineup);
        saveLineup(newLineup, $scope.editLineupIndex);
      }, function() {
        console.log("Modal Closed.");
      })["finally"](function() {
        $scope.modalInstance = undefined;
        $scope.editLineupIndex = undefined;
      });
    };
    $scope.editLineup = function(index) {
      $scope.editLineupIndex = index;
      $scope.createNewLineup();
    };
    var saveLineup = function(newLineup, index) {
      var newLineup = {
        leftWing: newLineup[0],
        center: newLineup[1],
        rightWing: newLineup[2],
        defence1: newLineup[3],
        defence2: newLineup[4],
        lineupTitle: newLineup[5]
      };
      if (index >= 0) {
        $scope.lineups[index] = newLineup;
      } else {
        $scope.lineups.push(newLineup);
      }
    };
    console.log("Ended lineupsController");
    $("#success").show();
    $("#warning").hide();
  } ]).controller("createLineupController", [ "$scope", "$modalInstance", "players", "lineup", function($scope, $modalInstance, players, lineup) {
    $scope.pages = [ "Left Wing", "Center", "Right Wing", "Defence", "Title" ];
    $scope.totalItems = $scope.pages.length * 10;
    $scope.currentPage = 0;
    $scope.validateLineup = function() {
      $scope.validLineup = true;
      if ($scope.newLineup.length < 6) {
        $scope.validLineup = false;
        return;
      }
      for (var i = 0; i < $scope.newLineup.length - 1; i++) {
        var uniquePlayerNumber = $scope.newLineup[i].playerNumber;
        for (var j = 0; j < $scope.newLineup.length - 1; j++) {
          if (i != j && $scope.newLineup[j].playerNumber === uniquePlayerNumber) {
            $scope.validLineup = false;
            return;
          }
        }
      }
    };
    $scope.saveNew = function() {
      console.log("Create new lineup");
      $scope.newLineup[5] = $scope.newTitle;
      $modalInstance.close($scope.newLineup);
    };
    $scope.setPage = function(index) {
      $scope.currentPage = index;
      if (index === 3) {
        $scope.defenceSelected = 1;
      } else {
        $scope.defenceSelected = 0;
      }
      $scope.selectionMade = $scope.newLineup[index];
    };
    $scope.players = players;
    $scope.newLineup = [];
    if (lineup) {
      $scope.newLineup[0] = lineup.leftWing;
      $scope.newLineup[1] = lineup.center;
      $scope.newLineup[2] = lineup.rightWing;
      $scope.newLineup[3] = lineup.defence1;
      $scope.newLineup[4] = lineup.defence2;
      $scope.newLineup[5] = $scope.newTitle = lineup.lineupTitle;
      $scope.validateLineup();
    }
    var setPosition = function() {
      if ($scope.currentPage === 3) {
        if ($scope.defenceSelected === 1) {
          return $scope.currentPage;
        } else {
          return $scope.currentPage + 1;
        }
      } else {
        return $scope.currentPage;
      }
    };
    $scope.playerSelection = function(player) {
      $scope.selectionMade = player;
      var position = setPosition();
      $scope.newLineup[position] = player;
      $scope.validateLineup();
    };
    $scope.setDefenceSelection = function(mode) {
      if (mode === 1 && $scope.currentPage === 3) {
        $scope.defenceSelected = 1;
      }
      if (mode === 2 && $scope.currentPage === 3) {
        $scope.defenceSelected = 2;
      }
    };
    $scope.setTitle = function() {
      $scope.newLineup[$scope.currentPage + 1] = $scope.newTitle;
      $scope.validateLineup();
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
  "use-strict";
  angular.module("HockeyApp").directive("gameButtons", function() {
    return {
      restrict: "E",
      templateUrl: "views/partials/game/game-buttons.html"
    };
  }).directive("gameToggles", function() {
    return {
      restrict: "E",
      templateUrl: "views/partials/game/game-toggles.html"
    };
  }).directive("gameBoard", function() {
    return {
      restrict: "E",
      templateUrl: "views/partials/game/game-board.html"
    };
  }).directive("gameHistory", function() {
    return {
      restrict: "E",
      templateUrl: "views/partials/game/game-history.html"
    };
  }).directive("gamePlayer", function() {
    return {
      restrict: "E",
      templateUrl: "views/partials/game/game-player.html"
    };
  }).directive("gameLineup", function() {
    return {
      restrict: "E",
      templateUrl: "views/partials/game/game-lineup.html"
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