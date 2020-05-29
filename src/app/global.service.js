/* eslint-disable no-unused-vars */
/* eslint-disable angular/log */
/* eslint-disable no-console */
/* eslint-disable angular/timeout-service */
/* eslint-disable angular/json-functions */
/* eslint-disable no-undef */
/* eslint-disable angular/di */
angular.module('rchat').service('GlobalService', ['$rootScope',function ($rootScope) {
    var service = this;
    service.guid = function () {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    service.initCC = function (callback) {
        var CREDENTIALS = {
            appId: 1329,
            authKey: 'OTAcmJRHQupCFXb',
            authSecret: '3jfcMS5QQBPgeQf'
        };
        ConnectyCube.init(CREDENTIALS);
        var steps = JSON.parse(localStorage.getItem('steps'));
        steps.push('initCC');
        localStorage.setItem('steps', JSON.stringify(steps));
        callback();
    };
    service.loginCC = function (callback) {
        console.log("login CC");
        var userCredentials = { login: $rootScope.me.idCC, password: $rootScope.me.credentialCC };
        console.log(userCredentials);
        ConnectyCube.createSession(userCredentials, function (error, session) {
            console.log("session");
            console.log("login", session)
            console.log(error);
            var steps = JSON.parse(localStorage.getItem("steps"));
            steps.push("loginCC");
            localStorage.setItem("steps", JSON.stringify(steps));
            var userConnect = {
                userId: $rootScope.me.idCC,
                password: $rootScope.me.credentialCC
            };
            console.log(userConnect);
            ConnectyCube.chat.connect(
                userConnect,
                function (error) {
                    console.log("response loginCC chat");
                    if (!error) {
                        var steps = JSON.parse(localStorage.getItem("steps"));
                        steps.push("chatCC");
                        localStorage.setItem("steps", JSON.stringify(steps));
                        service.listennerCC();
                        callback({ status: "success" });
                    } else {
                        callback({ status: "error" });
                    }
                }
            );
        });
    }
    service.listennerCC = function () {
        console.log("listenerCC");
        var steps = JSON.parse(localStorage.getItem('steps'));
        steps.push('listennerCC');
        localStorage.setItem('steps', JSON.stringify(steps));
        ConnectyCube.videochat.onCallListener = function (session) {
            alert("callListener");
            if ($rootScope.me.call.user_uid){
                firebase.database().ref('users/' + $rootScope.me.call.user_uid).once("value", function (snapshot) {
                    var receiver = snapshot.val();
                    console.log(receiver);
                    swal({
                        title: "Nova Chamada",
                        text: receiver.name + " está te ligando",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#2a9fd5",
                        confirmButtonText: "Aceitar",
                        cancelButtonText: "Recusar",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    },
                        function (isConfirm) {
                            if (isConfirm) {
                                for (var t in $rootScope.me.chats) {
                                    if ($rootScope.me.chats[t].user_id == $rootScope.me.call.user_uid) {
                                        $state.go("messages", { id: t, receiveCall: true });
                                    }
                                }
                                $rootScope.onCallSession = session;
                            } else {
                                session.reject({});
                            }
                        });
                })
            }
        };
        ConnectyCube.videochat.onRemoteStreamListener = function (session) {
            alert("onRemoteListenner");
            setTimeout(function() {
                if ($rootScope.route == "messages") {
                    session.attachMediaStream('remote-call', remoteStream);
                }
            }, 1000);
        };
        ConnectyCube.videochat.onAcceptCallListener = function (session) {
            alert("on Accepted");
        };
        ConnectyCube.videochat.onRejectCallListener = function (session) {
            $state.go("channels");
            swal("Chamada recusada", "", "warning");
        };
        ConnectyCube.videochat.onStopCallListener = function () {
            $state.go("channels");
            swal("Chamada encerrada", "", "warning");
        };
    }
    service.mappingUserMe = function (uid) {
        console.log("mapping userMe");
        var user = firebase.database().ref('users/' + uid);
        var mappingUser = function (snapshot) {
            console.log("atualiza o me");
            $rootScope.me = snapshot.val();
            $rootScope.me.uid = uid;
            localStorage.setItem("me", JSON.stringify($rootScope.me));
        }
        //MAPPING USER INFO
        user.on('value', function (snapshot) {
            mappingUser(snapshot);
        });
    };

    //RANDOM KEY
    $rootScope.guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
}])