(function () {
    angular
        .module("Connexion")
        .controller("SearchController", SearchController);

    function SearchController($routeParams, $http, PageService, $location, UserService, PostService) {
        var vm = this;

        vm.userId = $routeParams.userId;
        vm.posts = [];
        vm.users = [];

        vm.goBack = goBack;
        vm.goToThisProfile = goToThisProfile;

        function goToThisProfile(u) {
            $location.url("/user/"+ u._id+"/profile");
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
        // vm.searchText = "";
        // vm.data = [];
        // $http.get('./assests/connexion-dummy.json').success(function (data) {
        //     vm.data = data;
        //     vm.data = vm.data.slice(0, 5);
        // });


        // vm.data2 = [];
        // $http.get('./assests/connexion-dummy.json').success(function (data) {
        //     vm.data2 = data;
        //     vm.data2 = vm.data2.slice(0, 10);
        // });
    }

})();