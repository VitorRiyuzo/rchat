
angular.module('rchat').controller('ChannelsController', function ($scope, $log) {
    var vm = this;
    vm.message = message;
    vm.dashboard = $scope.dashboard;
    $log.log($scope.dashboard);
    function message() {
        vm.dashboard.main = 0;
        vm.dashboard.messages = 100;
    }
});