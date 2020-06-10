/* eslint-disable no-unused-vars */
/* eslint-disable angular/log */
/* eslint-disable no-console */

angular.module('rchat').controller('MessagesController', function ($scope, MessagesService, $rootScope) {
    var vm = this;
    vm.sendMessage = sendMessage;
    vm.back = back;
    vm.messages = [];
    vm.receiver = {};
    vm.textSend = "";
    vm.chatId = null;
    $scope.$watch('idChat', function (newValue, oldValue){
        console.log(newValue);
        console.log(oldValue);
        if(newValue && oldValue != newValue){
            vm.chatId = newValue;
            MessagesService.getReceiver(newValue,function(receiver) {
                console.log(receiver);
                receiver.name = receiver.email.split('@')[0];
                vm.receiver = receiver;
                $rootScope.update();
            })
            MessagesService.getMessages(newValue,function(newMessage){
                console.log(newMessage);
                vm.messages.push(newMessage);
                $rootScope.update();
            });
        }
    });
    function sendMessage(text) {
        MessagesService.sendMessages(vm.chatId,text,function() {
            vm.textSend = "";
            $rootScope.update();
        })
    }
    function back() {
        $rootScope.idChat = null;
    }
});