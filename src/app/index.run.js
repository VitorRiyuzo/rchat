/* eslint-disable angular/timeout-service */
/* eslint-disable angular/on-watch */
/* eslint-disable angular/no-private-call */
/* eslint-disable no-undef */
(function() {
	'use strict';
	angular
		.module('rchat')
		.run(runBlock);

	/** @ngInject */
	function runBlock($log,$rootScope,$window) {
		$log.debug('runBlock end');
		localStorage.setItem('steps','[]');
		var firebaseConfig = {
			apiKey: "AIzaSyDpPjNA0ia7dfc6dmXGA4TJ2Oe8Q8HYfK8",
			authDomain: "r-chat-639a7.firebaseapp.com",
			databaseURL: "https://r-chat-639a7.firebaseio.com",
			projectId: "r-chat-639a7",
			storageBucket: "r-chat-639a7.appspot.com",
			messagingSenderId: "840587753386",
			appId: "1:840587753386:web:3e36c90f1bc816bdc61dd3"
		};
		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);
		$rootScope.loading = false;
		$rootScope.idChat = null;
		if ($window.innerWidth < 960){
			$rootScope.isMobile = true;
		}else{
			$rootScope.isMobile = false;
		}
		// setTimeout(function(){
		// 	$rootScope.idChat = "-M9OSDA-O73mpEjlZE4V";
		// }, 1000);
		$rootScope.$on('$stateChangeSuccess', function (event, toState) {
			$rootScope.route = toState.name;
			if ($rootScope.route !== "login") {
				$rootScope.login = false;
			} else {
				$rootScope.login = true;
			}
		});
		$rootScope.setLoad = function (status) {
			$rootScope.loading = status;
			if (!$rootScope.$$phase) {
				$rootScope.$apply();
			}
		}
		$rootScope.update = function () {
			if (!$rootScope.$$phase) {
				$rootScope.$apply();
			}
		}
	}
})();
