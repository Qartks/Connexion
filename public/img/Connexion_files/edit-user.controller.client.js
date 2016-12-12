(function () {
    angular
        .module("Connexion")
        .controller("UserEditController", UserEditController);
    
    function UserEditController($routeParams, $rootScope, $location, UserService, PageService, PostService, $mdToast,$mdSidenav) {
        vm = this;

        vm.loggedInUserId = $rootScope.currentUser._id;
        vm.userId = $routeParams.userId;
        vm.user= {};

        vm.goToSearch = goToSearch;
        vm.updateThisProfile = updateThisProfile;
        vm.goBackToProfile = goBackToProfile;
        vm.goToCreatePost = goToCreatePost;
        vm.logout = logout;
        vm.goBack = goBack;
        vm.toggleLeft = toggleLeft('left');

        function toggleLeft(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {

                    });
            }
        }

        function goBack() {
            $location.url(PageService.getPrevPage());
        }

        function goToCreatePost() {
            PageService.setPrevPage('/user/profile/'+ vm.userId +'/edit');
            $location.url("/user/post/new");
        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url("/login");
                })
        }

        function goBackToProfile() {
            PageService.setPrevPage('/user/profile/'+ vm.userId +'/edit');
            $location.url("/user/profile/" + vm.userId);
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
            PageService.setPrevPage('/user/profile/'+ vm.userId +'/edit');
            $location.url('/user/search');
        }
    }
})();