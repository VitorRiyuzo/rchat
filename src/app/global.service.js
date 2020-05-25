/* eslint-disable angular/json-functions */
/* eslint-disable no-undef */
/* eslint-disable angular/di */
angular.module('rchat').service('GlobalService', [function () {
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
    }
}])