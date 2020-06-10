/* eslint-disable angular/timeout-service */
/* eslint-disable no-unused-vars */
/* eslint-disable angular/log */
/* eslint-disable no-console */
/* eslint-disable angular/di */

angular.module('rchat').controller('DashboardController',['DashboardService','$scope','$rootScope', function (DashboardService,$scope,$rootScope) {
    var vm = this;
    vm.teste = "Teste";
    vm.main = 100;
    vm.messages = 0;
    vm.menu = false;
    vm.menuToggle = menuToggle;
    vm.logout = logout;
    console.log($scope);
    setTimeout(function (params) {
        $scope.$watch('idChat', function (newValue, oldValue) {
            if ($rootScope.isMobile){
                if(newValue){
                    vm.main = 0;
                    vm.messages = 100;
                }else{
                    vm.main = 100;
                    vm.messages = 0;
                }
            }
        })
    }, 1000);
    (function init () {
        DashboardService.verifySession();
    })()
    function menuToggle() {
        $("#menu").slideToggle('slow');
        if(vm.menu){
            vm.menu = false;
        }else{
            vm.menu = true;
        }
    }
    function logout() {
        DashboardService.logout();
    }
}]);