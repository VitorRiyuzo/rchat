/* eslint-disable angular/di */
/* eslint-disable angular/json-functions */
/* eslint-disable no-console */
/* eslint-disable angular/log */
/* eslint-disable no-undef */

angular.module('rchat').service("LoginService",['$rootScope','GlobalService', function ($rootScope, GlobalService) {
    var service = this;
    service.firebaseAuth = function (user, callback) {
        console.log("service firebaseApp");
        firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(function (resp) {
            console.log("logou firebase");
            console.log(resp.user);
            var user = firebase.database().ref('users/' + resp.user.uid);
            var loadUser = function (snapshot) {
                console.log("Buscou dados no firebase");
                $rootScope.me = snapshot.val();
                $rootScope.me.uid = snapshot.key;
                localStorage.setItem("me", JSON.stringify($rootScope.me));
                GlobalService.initCC(function() {
                    console.log("initCC")
                    GlobalService.loginCC(callback);
                })
                GlobalService.mappingUserMe($rootScope.me.uid);
            }
            user.once('value', function (snapshot) {
                loadUser(snapshot);
            })
        }, function (error) {
            $rootScope.setLoad(false);
            console.log("erro na autenticação");
            switch (error.code) {
                case "auth/invalid-email":
                    error.message = "Email não é válido";
                    break;
                case "auth/user-disable":
                    error.message = "O usuário está desabilitado";
                    break;
                case "auth/user-not-found":
                    error.message = "Usuário não encontrado";
                    break;
                case "auth/wrong-password":
                    error.message = "Senha inválida";
                    break;
                default: "Erro ao registrar usuário";
            }
            swal("Erro", error.message, "error");
        })
    };
}])