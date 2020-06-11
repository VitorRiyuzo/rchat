/* eslint-disable angular/log */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable angular/di */
angular.module('rchat').service("ProfileService", ['$rootScope', function ($rootScope) {
    var service = this;
    service.saveAvatar = function(image, callback) {
        var storageRef = firebase.storage().ref();
        var mountainImagesRef = storageRef.child('profiles/' + $rootScope.me.uid + ".jpg");
        mountainImagesRef.putString(image, 'data_url').then(function (snapshot) {
            mountainImagesRef.getDownloadURL().then(function (url) {
                console.log(url);
                callback()
                firebase.database().ref('users/' + $rootScope.me.uid + "/avatar").set(url);
            }).catch(function (error) {
            });
        });
    };
    service.updateProfile = function(obj, callback) {
        firebase.database().ref('users/' + $rootScope.me.uid).update(obj);
        callback()
    }
}])