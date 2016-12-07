(function(){
    angular
        .module("Connexion")
        .controller("UserLandingController", UserLandingController);

    function UserLandingController($http, $sce, $location, $rootScope, PageService, PostService, UserService) {
        var vm = this;
        vm.data = [];
        vm.userId = $rootScope.currentUser._id;
        vm.message =" I'am going to this thing";
        vm.hashtag = "Connexion";

        // $http.get('./assests/connexion-dummy.json').success(function (data) {
        //     vm.data = data;
        //     vm.data = vm.data.slice(0, 5);
        // });

        vm.goToSearch = goToSearch;
        vm.goToProfile = goToProfile;
        vm.goToCreatePost = goToCreatePost;
        vm.googleapiurl = googleapiurl;
        vm.goToPostDetails = goToPostDetails;
        vm.goToUserProfilePage = goToUserProfilePage;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url("/login");
                })
        }


        function init() {
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

        function goToUserProfilePage(post) {
            $location.url("/user/" + post.creatorId + "/profile");
        }

        function goToPostDetails(post) {
            $location.url("/user/" + vm.userId + "/post/" + post._id);
        }

        function googleapiurl(d) {
            var apiKey = process.env.GMAP_API_KEY;
            var url = "https://www.google.com/maps/embed/v1/place?key="+ apiKey + "&q=";
            // var location = d.latitude + "," + d.longitude;
            // var location = d.address;
            var location = "Boston";
            url += location;

            return $sce.trustAsResourceUrl(url);
        }

        function goToSearch() {
            PageService.setPrevPage('/user');
            $location.url('/user/'+ vm.userId + '/search');
        }

        function goToProfile() {
            $location.url('/user/' + vm.userId + '/profile');
        }

        function goToCreatePost() {
            $location.url('/user/' + vm.userId + '/post');
        }

    }
})();    
