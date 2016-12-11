(function () {
    angular
        .module("Connexion")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, PageService, $location, $rootScope, PostService, UserService, $mdSidenav, ToastService) {

        var vm = this;
        vm.user = {};
        vm.data = [];
        vm.loggedInUser = {};
        vm.userId = $routeParams.userId;
        init();
        vm.getSelectedRating = getSelectedRating;
        vm.rating =  {
            current: vm.user.rating,
            max: 5
        };

        function getSelectedRating (rating) {
            vm.user.rating = rating;
            UserService
                .updateUser(vm.userId, vm.user)
                .success(function (obj) {

                })
                .error(function (err) {
                    console.log(err);
                });
        }


        vm.isThisPostOpen = isThisPostOpen;
        vm.goToSearch = goToSearch;
        vm.goToCreatePost = goToCreatePost;
        vm.goToPostDetails = goToPostDetails;
        vm.editThisProfile = editThisProfile;
        vm.deleteThisProfile = deleteThisProfile;
        vm.isThisMine = isThisMine;
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

        function isThisMine() {
            return vm.loggedInUser._id === vm.userId || vm.loggedInUser.role==="admin";
        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url("/login");
                })
        }

        function deleteThisProfile() {
            UserService
                .deleteUser(vm.userId)
                .success(function (page) {
                    $location.url("/login");
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        function init() {
            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                    vm.userRating = user.rating;
                })
                .error(function (err) {
                    console.log(err);
                });

            PostService.getPostByUserId(vm.userId)
                .success(function (posts) {
                    vm.data = posts;
                })
                .error(function (err) {
                    console.log(err);
                });

            UserService
                .getLoggedInUser()
                .success(function (user) {
                    vm.loggedInUser = user;
                });
        }


        function goBack() {
            $location.url(PageService.getPrevPage());
        }
        function editThisProfile() {
            PageService.setPrevPage('/user/profile/'+ vm.userId);
            $location.url("/user/profile/"+ vm.userId +"/edit");
        }

        function goToPostDetails(post) {
            PageService.setPrevPage('/user/profile/'+ vm.userId);
            $location.url('/user/post/' + post._id);
        }

        function isThisPostOpen(post) {
            return post.isOpen ? "green" : "blue";
        }

        function goToSearch() {
            PageService.setPrevPage('/user/profile/'+ vm.userId);
            $location.url('/user/search');
        }

        function goToCreatePost() {
            PageService.setPrevPage('/user/profile/'+ vm.userId);
            if (vm.loggedInUser !== '0' ) {
                $location.url('/user/post/new');
            } else {
                // ToastService.showToast('You need to login!');
            }
        }
    }
})();