(function () {
    angular
        .module("Connexion")
        .controller("UserEditController", UserEditController);
    
    function UserEditController($routeParams, $location, UserService, PageService, PostService, $mdToast) {
        vm = this;

        vm.userId = $routeParams.userId;
        vm.user= {};

        vm.goToSearch = goToSearch;
        vm.updateThisProfile = updateThisProfile;
        vm.goBackToProfile = goBackToProfile;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url("/login");
                })
        }

        function goBackToProfile() {
            $location.url("/user/" + vm.userId + "/profile");
        }

        function showSimpleToast() {

            $mdToast.show(
                $mdToast.simple()
                    .textContent('Updated!')
                    .position('bottom right')
                    .hideDelay(3000)
            );
        }
        
        function updateThisProfile(user) {
            UserService
                .updateUser(user)
                .success(function (u) {
                    showSimpleToast();
                })
                .error(function (err) {
                    console.log(err);
                });
        }

        function init() {
            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                })
                .error(function (err) {
                    console.log(err);
                });
        }

        init();

        function goToSearch() {
            PageService.setPrevPage('/user/' + vm.userId + '/profile/edit');
            $location.url('/user/'+ vm.userId + '/search');
        }

    }
})();