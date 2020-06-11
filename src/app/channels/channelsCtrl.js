/* eslint-disable angular/log */
/* eslint-disable no-console */

angular.module('rchat').controller('ChannelsController', function ($scope,$rootScope, ChannelsService) {
    var vm = this;
    vm.getChat = getChat;
    vm.dashboard = $scope.dashboard;
    vm.chats = [];
    (function() {
        ChannelsService.getChats(function(chats) {
            vm.chats = chats;
            console.log(chats);
        })
    })()
    function getChat(chat) {
        console.log(chat);
        $rootScope.idChat = chat.uid;
    }
});