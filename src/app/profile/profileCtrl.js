/* eslint-disable angular/log */
/* eslint-disable no-console */
/* eslint-disable angular/controller-as */
/* eslint-disable no-unused-vars */
/* eslint-disable angular/document-service */
/* eslint-disable no-undef */

angular.module('rchat').controller('ProfileController', function ($rootScope, GlobalService, ProfileService) {
    var vm = this;
    vm.user = $rootScope.me;
    if(!vm.user.avatar){
        vm.user.avatar = "assets/images/profile.png"
    }
    vm.sendFile = sendFile;
    vm.saveAvatar = saveAvatar;
    vm.saveProfile = saveProfile;
    vm.myImage = "";
    vm.myCroppedImage = "";
    function sendFile(file) {
        vm.myImage = file;
    }
    function saveAvatar() {
        vm.user.avatar = vm.myCroppedImage;
        GlobalService.resizeBase64Img(vm.myCroppedImage, function (newImage) {
            newImage = newImage.toDataURL();
            ProfileService.saveAvatar(newImage,function() {
                vm.myImage = "";
                vm.myCroppedImage = "";
                console.log()
            })
        });
    }
    function saveProfile() {
        ProfileService.updateProfile({"phone_number":vm.user.phone_number},function(){
            swal('Sucesso!', 'Dados foram atualizados', 'success');
        })
    }
});
