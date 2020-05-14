
angular.module('rchat').controller('MessagesController', function (LoginService) {
    var vm = this;
    vm.teste = "Teste";
    LoginService.exempleFunction();
});