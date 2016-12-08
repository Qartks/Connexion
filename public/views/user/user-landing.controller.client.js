(function(){
    angular
        .module("Connexion")
        .controller("UserLandingController", UserLandingController);

    function UserLandingController($sce, $location, $rootScope, PageService, PostService, UserService) {
        var vm = this;
        vm.data = [];
        vm.userId = $rootScope.currentUser._id;
        vm.message =" I'am going to this thing";
        vm.hashtag = "Connexion";

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
            $location.url("/user/profile/" + post.creatorId);
        }

        function goToPostDetails(post) {
            $location.url("/user/post/" + post._id);
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
            $location.url('/user/search');
        }

        function goToProfile() {
            $location.url('/user/profile/'+ vm.userId);
        }

        function goToCreatePost() {
            $location.url('/user/post/new');
        }

    }
})();    
