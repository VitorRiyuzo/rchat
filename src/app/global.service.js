/* eslint-disable angular/document-service */
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
                                $state.go("call", { status:"receiving"});
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
            $rootScope.me.name = $rootScope.me.email.split('@')[0];
            if (!$rootScope.me.avatar) {
                $rootScope.me.avatar = "/assets/images/profile.png";
            }
            $rootScope.update();
            console.log($rootScope.me);
            localStorage.setItem("me", JSON.stringify($rootScope.me));
        }
        //MAPPING USER INFO
        user.on('value', function (snapshot) {
            mappingUser(snapshot);
        });
    };
    service.resizeBase64Img = function (base64, callback) {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        img = new Image();
        img.onload = function () {

            canvas.height = canvas.width * (img.height / img.width);

            // step 1
            var oc = document.createElement('canvas'),
                octx = oc.getContext('2d');

            oc.width = img.width * 0.5;
            oc.height = img.height * 0.5;
            octx.drawImage(img, 0, 0, oc.width, oc.height);

            // step 2
            octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

            ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,
                0, 0, canvas.width, canvas.height);
            callback(canvas);
        };
        img.src = base64;
    };
    service.blobToFile = function (theBlob, fileName) {
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        theBlob.filename = fileName;
        return theBlob;
    };
    service.b64toBlob = function (b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };
}])