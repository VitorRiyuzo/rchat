/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable angular/log */
/* eslint-disable no-console */
/* eslint-disable angular/di */
angular.module('rchat').controller('ContactsController',['ContactsService','$rootScope', function (ContactsService, $rootScope) {
    var vm = this;
    vm.add = false;
    vm.toggleAdd = toggleAdd;
    vm.searchUser = searchUser;
    vm.listSearch = [];
    vm.users = [];
    vm.addContact = addContact;
    (function init() {
        if($rootScope.me.contacts){
            ContactsService.getContacts(function(contacts) {
                vm.users = contacts;
                $rootScope.update();
            });
        }
    })()
    function toggleAdd() {
        if(!vm.add){
            vm.add = true;
        }else{
            vm.add = false;
        }
    }
    function addContact(user) {
        for(var y in vm.users){
            if(vm.users[y].uid == user.uid){
                swal('Atenção','Esse contato já está em sua lista', 'warning');
            }
        }
        swal({
            title: "Adicionar?",
            html: true,
            text: 'Deseja adicionar ' + user.email,
            type: "success",
            closeOnConfirm: true,
            showCancelButton: true,
        }, function () {
            ContactsService.addContact(user,function() {
                swal('Sucesso!', "Contato adicionado","success");
                init();
            });
        })
    }
    function searchUser(search) {
        vm.listSearch = [];
        if(search!=''){
            ContactsService.getUsers(search, function(users) {
                console.log(users);
                vm.listSearch = users;
                $rootScope.update();
            });
        }
    }
}])