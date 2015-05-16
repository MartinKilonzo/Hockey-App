'use strict';

angular.module('HockeyApp')

.controller('MainCtrl', function($location, version, user) {

	var vm = this;
	vm.path = $location.path.bind($location);
	vm.version = version;
	vm.user = user;


	/* Dropdown menu interaction */
	var myTimeout;
	var menu;
	$('.dropdown').mouseenter(function() {
		menu = $(this).children('.dropdown-menu');
		myTimeout = setTimeout(function() {
        menu.show(400);
    }, 400);
	}).mouseleave(function() {
		clearTimeout(myTimeout);

		menu.delay(200).hide(300);
	});

});
