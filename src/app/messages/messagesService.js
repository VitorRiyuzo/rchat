/* eslint-disable angular/log */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable angular/di */
angular.module('rchat').service("MessagesService", ['$rootScope', function ($rootScope) {
    var service = this;
    service.getMessages = function(chatId,callback) {
        firebase.database().ref('messages/'+chatId).on('child_added', function (snapshot) {
            console.log("mapeando messages");
            callback(snapshot.val());
        })
    }
    service.getReceiver = function (chatId, callback) {
        console.log(chatId);
        console.log($rootScope.me);
        firebase.database().ref('users/' + $rootScope.me.chats[chatId].user_id).once('value', function (snapshot) {
            var receiver = snapshot.val();
            if(!receiver.avatar){
                receiver.avatar = 'assets/images/profile.png';
            }
            callback(receiver);
        })
    }
    service.sendMessages = function(chatId, text,callback) {
        var message = {
            message:text,
            user_id:$rootScope.me.uid
        }
        console.log(message);
        firebase.database().ref('messages/'+chatId).push(message);
        callback();
    }
}])