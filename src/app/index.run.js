/* eslint-disable no-undef */
(function() {
  'use strict';

  angular
    .module('rchat')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

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
  }

})();
