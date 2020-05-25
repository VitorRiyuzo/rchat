/* eslint-disable no-undef */
angular.module('rchat').controller('RegisterController', function ($log, $rootScope, GlobalService, $state, RegisterService) {
    var vm = this;
    vm.teste = "Teste";
    vm.register = register;
    function register(user) {
        $rootScope.setLoad(true);
        if(user.password == user.confirmPassword){
            var userData={
                email:user.email,
                password:user.password,
                phone_number:user.phone_number
            }
            userData.credentialCC = GlobalService.guid();
            var userCC = { 'login':userData.credentialCC, 'email': userData.email , password: userData.credentialCC};
            RegisterService.registerCC(userCC,userData, function() {
                $rootScope.setLoad(false);
                swal("Sucesso!", "Cadastro realizado com sucesso!", "success");
                $state.go("login");
            });
        }else{
            swal("Atenção","Senhas não coincidem","warning");
        }
    }
});