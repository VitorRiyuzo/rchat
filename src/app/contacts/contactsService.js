/* eslint-disable no-unused-vars */
/* eslint-disable angular/di */
/* eslint-disable angular/json-functions */
/* eslint-disable no-console */
/* eslint-disable angular/log */
/* eslint-disable no-undef */

angular.module('rchat').service("ContactsService", ['$rootScope', 'GlobalService', '$state', function ($rootScope, GlobalService, $state) {
    var service = this;
    service.getUsers = function(search, callback) {
        firebase.database().ref('users').once('value', function(snapshot) {
            var users = snapshot.val();
            var response = [];
            for(var k in users){
                var user = users[k];
                if(user.email.indexOf(search)>-1 && k!= $rootScope.me.uid){
                    user.uid = k;
                    if(!user.avatar){
                        user.avatar = 'assets/images/profile.png'
                    }
                    response.push(user);
                }
            }
            callback(response);
        })
    }
    service.getContacts = function(callback) {
        var uidList = []
        var count = 0;
        var response = [];
        for(var i in $rootScope.me.contacts){
            uidList.push(i);
        }
        function getDetail(uid) {
            firebase.database().ref('users/' + uid).once('value', function(snapshot) {
                var user = snapshot.val();
                user.uid = uid;
                if (!user.avatar) {
                    user.avatar = 'assets/images/profile.png'
                }
                response.push(user);
                count++;
                if(response.length < uidList.length){
                    getDetail(uidList[count]);
                }else{
                    callback(response);
                }
            })
        }
        getDetail(uidList[count]);
    }
    service.addContact = function(user,callback) {
        console.log(user);
        console.log($rootScope.me);
        firebase.database().ref('users/' + $rootScope.me.uid + '/contacts/' + user.uid).set(true);
        callback();
    }
    service.addChat = function(user, callback) {
        //Criar chat em nó de chats
        var members = {}
        console.log(user);
        members[user.uid] = true;
        members[$rootScope.me.uid] = true;
        var newKey = firebase.database().ref().push().key;
        console.log(newKey);
        firebase.database().ref("chats/" + newKey).set({ members: members });

        //Adiciona referência do chat, em nó de cada integrante
        var chat1 = {};
        chat1 = {
            user_id: user.uid,
            active: true
        };
        var chat2 = {};
        chat2 = {
            user_id: $rootScope.me.uid,
            active: true
        }; 
        firebase.database().ref('/users/' + $rootScope.me.uid + "/chats/" + newKey).set(chat1);
        firebase.database().ref('/users/' + user.uid + "/chats/" + newKey).set(chat2);
        callback(newKey);
    }
}])