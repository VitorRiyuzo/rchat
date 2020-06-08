/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable angular/log */
/* eslint-disable no-console */
/* eslint-disable angular/di */
angular.module('rchat').controller('ContactsController',['ContactsService','$rootScope', function (ContactsService, $rootScope) {
    var vm = this;
    //vm.add = false;
    vm.toggleAdd = toggleAdd;
    vm.searchUser = searchUser;
    vm.listSearch = [];
    vm.users = [];
    
    vm.addContact = addContact;
    (function init() {
        if($rootScope.me.contacts){
            ContactsService.getContacts(function(contacts) {
                vm.users = contacts;
                vm.add =false;
                vm.search = "";
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
        console.log("addcontact");
        for(var y in vm.users){
            if(vm.users[y].uid == user.uid){
                swal('Atenção','Esse contato já está em sua lista', 'warning');
            }
        }
        console.log("Alert add contacts");
        
        swal({
            title: "Adicionar?",
            text: 'Deseja adicionar ' + user.email,
            type: "warning",
            closeOnConfirm: true,
            showCancelButton: true,
        }).then(function (isConfirm) {
            console.log("callback");
            if(isConfirm){
                ContactsService.addContact(user,function() {
                    swal('Sucesso!', "Contato adicionado","success");
                    init();
                });
            }
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