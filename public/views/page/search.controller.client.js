(function () {
    angular
        .module("Connexion")
        .controller("SearchController", SearchController);

    function SearchController($routeParams, $rootScope, PageService, $location, UserService, PostService) {
        var vm = this;

        vm.userId = $rootScope.currentUser._id;
        vm.posts = [];
        vm.users = [];

        vm.goBack = goBack;
        vm.goToThisProfile = goToThisProfile;
        vm.goToThisPost = goToThisPost;

        function goToThisPost(post) {
            $location.url("/user/post/"+post._id);
        }

        function goToThisProfile(u) {
            $location.url("/user/profile/"+u._id);
        }


        function goBack() {
            $location.url(PageService.getPrevPage());
        }

        function init() {
            UserService
                .getAllValidUsers(vm.userId)
                .success(function (users) {
                    vm.users = users;
                })
                .error(function (err) {
                    console.log(err);
                });

            PostService
                .getAllOpenPosts(vm.userId)
                .success(function (posts) {
                    vm.posts = posts;
                })
                .error(function (err) {
                    console.log(err);
                });
        }

        init();
    }

})();