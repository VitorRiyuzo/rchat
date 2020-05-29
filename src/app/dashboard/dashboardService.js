/* eslint-disable no-unused-vars */
/* eslint-disable angular/di */
/* eslint-disable angular/json-functions */
/* eslint-disable no-console */
/* eslint-disable angular/log */
/* eslint-disable no-undef */

angular.module('rchat').service("DashboardService", ['$rootScope', 'GlobalService','$state', function ($rootScope, GlobalService, $state) {
    var service = this;
    service.logout = function() {
        firebase.auth().signOut().then(function () {
            localStorage.clear();
            localStorage.setItem('steps', '[]');
            $state.go("login");
        }).catch(function (error) {
            console.error("error",error);
        });
    };
    service.verifySession = function() {
        if (!$rootScope.me) {
            if (!localStorage.getItem("me")) {
                $state.go("login");
            } else {
                $rootScope.setLoad(true);
                $rootScope.me = JSON.parse(localStorage.getItem('me'));
                $rootScope.me.name = $rootScope.me.email.split('@')[0];
                if(!$rootScope.me.avatar){
                    $rootScope.me.avatar = "/assets/images/profile.png";
                }
                GlobalService.initCC(function() {
                    GlobalService.loginCC(function() {
                        GlobalService.listennerCC();
                        $rootScope.setLoad(false);
                    });
                })
            }
        }
    }
}])