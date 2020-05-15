
angular.module('rchat').controller('DashboardController', function ($log) {
    var vm = this;
    vm.teste = "Teste";
    vm.main = 100;
    vm.messages = 0;
    vm.menu = false;
    vm.menuToggle = menuToggle;

    function menuToggle() {
        $("#menu").slideToggle('slow');
        if(vm.menu){
            vm.menu = false;
        }else{
            vm.menu = true;
        }
        $log.log(vm.menu)
    }
});