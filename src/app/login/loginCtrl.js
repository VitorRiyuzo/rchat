
angular.module('rchat').controller('LoginController', function(LoginService) {
    var vm = this;
    vm.teste = "Teste";
    LoginService.exempleFunction();
});
