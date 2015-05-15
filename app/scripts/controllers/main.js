'use strict';

angular.module('HockeyApp')

.controller('MainCtrl', function($location, version, user) {

	var vm = this;
	vm.path = $location.path.bind($location);
	vm.version = version;
	vm.user = user;

	/* Mouseover effects for navbar dropdown menus */
	var menu;
	$('.dropdown').hover(function () {
		menu = $(this).children('.dropdown-menu');
		menu.finish().show(400);
	}, function () {
		menu.stop().delay(200).hide(300);
	});

});
