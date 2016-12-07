(function () {
    angular
        .module("Connexion")
        .controller("ProfileController", ProfileController);

    function ProfileController($http, PageService, $location, $rootScope, $routeParams, PostService, UserService) {

        var vm = this;
        vm.data = [];
        vm.userId = $routeParams.userId;

        // $http.get('./assests/connexion-dummy.json').success(function (data) {
        //     vm.data = data;
        //     vm.data = vm.data.slice(5, 15);
        // });

        this.isThisPostOpen = isThisPostOpen;
        vm.goToSearch = goToSearch;
        vm.goToCreatePost = goToCreatePost;
        vm.goToPostDetails = goToPostDetails;
        vm.editThisProfile = editThisProfile;
        vm.deleteThisProfile = deleteThisProfile;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url("/login");
                })
        }
        
        function editThisProfile() {
            $location.url("/user/" + vm.userId + "/profile/edit");
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
        }

        init();

        function goToPostDetails(post) {
            $location.url('/user/'+ vm.userId + '/post/' + post._id);
        }

        function isThisPostOpen(post) {
            return post.isOpen ? "green" : "blue";
        }

        function goToSearch() {
            PageService.setPrevPage('/user/' + vm.userId + '/profile');
            $location.url('/user/'+ vm.userId + '/search');
        }

        function goToCreatePost() {
            $location.url('/user/' + vm.userId + '/post');
        }

    }


})();