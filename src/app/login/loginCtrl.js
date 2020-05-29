/* eslint-disable angular/log */
/* eslint-disable no-console */

angular.module('rchat').controller('LoginController', function(LoginService, $rootScope, $state) {
    var vm = this;
    vm.teste = "Teste";
    vm.login = login;
    function login (user) {
        console.log("controller login submit");
        $rootScope.setLoad(true);
        LoginService.firebaseAuth(user, function(result) {
            console.log(result);
            console.log("Login concluído");
            $rootScope.setLoad(false);
            $state.go("channels");
        })
    }
});
