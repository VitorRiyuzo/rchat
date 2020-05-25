(function() {
  'use strict';

  angular
    .module('rchat')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'register'
      })
      // .state('dashboard', {
      //   url:'/dashboard',
      //   templateUrl: 'app/dashboard/dashboard.html',
      //   controller: 'DashboardController',
      //   controllerAs: 'dashboard'
      // })
      .state('channels', {
        url: '/channels',
        views:{
          '':{
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'dashboard'
          },
          'main@channels':{
            templateUrl: 'app/channels/channels.html',
            controller: 'ChannelsController',
            controllerAs: 'channels'
          },
          'messages@channels': {
            templateUrl: 'app/messages/messages.html',
            controller: 'MessagesController',
            controllerAs: 'messages'
          }
        }
      })
      .state('contacts', {
        url: '/contacts',
        views: {
          '': {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'dashboard'
          },
          'main@contacts': {
            templateUrl: 'app/contacts/contacts.html',
            controller: 'ContactsController',
            controllerAs: 'contacts'
          },
          'messages@contacts': {
            templateUrl: 'app/messages/messages.html',
            controller: 'MessagesController',
            controllerAs: 'messages'
          }
        }
      })
      .state('profile', {
        url: '/profile',
        views: {
          '': {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'dashboard'
          },
          'main@profile': {
            templateUrl: 'app/profile/profile.html',
            controller: 'ProfileController',
            controllerAs: 'profile'
          },
          'messages@profile': {
            templateUrl: 'app/messages/messages.html',
            controller: 'MessagesController',
            controllerAs: 'messages'
          }
        }
      })
      .state('call', {
        url: '/call',
        templateUrl: 'app/call/call.html',
        controller: 'CallController',
        controllerAs: 'call'
      })

    $urlRouterProvider.otherwise('/login');
  }

})();
