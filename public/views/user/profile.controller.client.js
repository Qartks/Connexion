(function () {
    angular
        .module("Connexion")
        .controller("ProfileController", ProfileController);

    function ProfileController($http) {

        var vm = this;
        vm.data = [];
        $http.get('./assests/connexion-dummy.json').success(function (data) {
            vm.data = data;
            vm.data = vm.data.slice(0, 4);
        });

    }


})();