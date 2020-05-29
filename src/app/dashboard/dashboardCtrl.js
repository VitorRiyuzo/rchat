/* eslint-disable angular/log */
/* eslint-disable no-console */
/* eslint-disable angular/di */

angular.module('rchat').controller('DashboardController',['DashboardService', function (DashboardService) {
    var vm = this;
    vm.teste = "Teste";
    vm.main = 100;
    vm.messages = 0;
    vm.menu = false;
    vm.menuToggle = menuToggle;
    vm.logout = logout;
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