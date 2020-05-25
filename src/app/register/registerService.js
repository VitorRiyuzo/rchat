/* eslint-disable no-undef */
/* eslint-disable angular/log */
/* eslint-disable no-console */
/* eslint-disable angular/di */
angular.module('rchat').service('RegisterService', ['GlobalService', function (GlobalService) {
    var service = this;
    service.registerCC= function (userCC,userData,callback) {
        GlobalService.initCC(function () {
            ConnectyCube.createSession(function (error, session) {
                ConnectyCube.users.signup(userCC, function (error, user) {
                    if (!error) {
                        userData.idCC = user.id;
                        //$scope.actions.registerFirebase();
                        service.registerFirebase(userData,callback)
                    } else {
                        swal("Erro", "Não foi possivel completar registro, tente novamente", "error");
                        console.log(error);
                    }
                })
            })
        })
    };
    service.registerFirebase = function(userData, callback) {
        firebase.auth().createUserWithEmailAndPassword(userData.email,userData.password).then(function (resp) {
            console.log(resp);
            service.setFirebaseDb(resp.user,userData, callback);
        }, function (error) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    error.message = "Email já está em uso";
                    break;
                case "auth/invalid-email":
                    error.message = "Email inválido";
                    break;
                case "auth/operation-not-allowed":
                    error.message = "Conta desativada";
                    break;
                case "auth/weak-password":
                    error.message = "Senha não é forte o suficiente";
                    break;
                default: "Erro no cadastro do usuário";
            }
            swal("Erro", error.message, "error");
            console.log("Error message", error.message);
        });
    };
    service.setFirebaseDb = function (user, userData, callback) {
        delete userData.password;
        firebase.database().ref('users/' + user.uid).set(userData).then(function () {
            callback();
        }, function () {
            swal("Erro", "Não foi possivel completar registro", "error");
        })
    }
}])