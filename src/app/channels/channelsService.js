/* eslint-disable no-unused-vars */
/* eslint-disable angular/di */
/* eslint-disable angular/json-functions */
/* eslint-disable no-console */
/* eslint-disable angular/log */
/* eslint-disable no-undef */

angular.module('rchat').service("ChannelsService", ['$rootScope', function ($rootScope) {
    var service = this;
    service.getChats=function(callback) {
        var count = 0;
        var chats = [];
        var totalChats = [];
        for(var k in $rootScope.me.chats){
            totalChats.push(k);
        }
        function getDetail() {
            firebase.database().ref('users/' + $rootScope.me.chats[totalChats[count]].user_id).once('value', function (snapshot) {
                var user = snapshot.val();
                user.uid = $rootScope.me.chats[totalChats[count]].user_id;
                user.name = user.email.split("@")[0];
                if (!user.avatar) {
                    user.avatar = 'assets/images/profile.png'
                }
                console.log(totalChats);
                console.log(count);
                var chat = {
                    uid:totalChats[count],
                    user:user
                }
                chats.push(chat);
                count++;
                if(count<totalChats.length){
                    getDetail()
                }else{
                    callback(chats);
                }
            })
        }
        getDetail()
    }
}]);