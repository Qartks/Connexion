(function () {
    angular
        .module("Connexion")
        .controller("SearchController", SearchController);

    function SearchController($routeParams, $rootScope, PageService, $location, UserService, PostService) {
        var vm = this;

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
            console.log(PageService.getPrevPage())
            $location.url(PageService.getPrevPage());
        }

        function init() {
            UserService
                .getAllValidUsers()
                .success(function (users) {
                    vm.users = users;
                })
                .error(function (err) {
                    console.log(err);
                });

            PostService
                .getAllOpenPosts()
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