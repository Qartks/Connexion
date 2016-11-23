(function () {
    angular
        .module("Connexion")
        .controller("ProfileController", ProfileController);

    function ProfileController($http) {

        var vm = this;

        this.isthispostmine = isthispostmine;

        vm.data = [];
        $http.get('./assests/connexion-dummy.json').success(function (data) {
            vm.data = data;
            vm.data = vm.data.slice(5, 15);
        });


        function isthispostmine(post) {
            return post.isOpen ? "green" : "blue";
        }

    }


})();