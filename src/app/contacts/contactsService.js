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
            firebase.database('users/'+uid).once('value', function(snapshot) {
                var user = snapshot.val();
                user.uid = uid;
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
        firebase.database('users/' + $rootScope.me.uid+'/contacts/'+user.uid).set(true);
        callback();
    }
}])