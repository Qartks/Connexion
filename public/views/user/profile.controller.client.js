(function () {
    angular
        .module("Connexion")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, PageService, $location, $rootScope, PostService, UserService) {
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


        this.isThisPostOpen = isThisPostOpen;
        vm.goToSearch = goToSearch;
        vm.goToCreatePost = goToCreatePost;
        vm.goToPostDetails = goToPostDetails;
        vm.editThisProfile = editThisProfile;
        vm.deleteThisProfile = deleteThisProfile;
        vm.isThisMine = isThisMine;
        vm.logout = logout;

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
        
        function editThisProfile() {
            $location.url("/user/profile/"+ vm.userId +"/edit");
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


        function goToPostDetails(post) {
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
            $location.url('/user/post/new');
        }

    }


})();