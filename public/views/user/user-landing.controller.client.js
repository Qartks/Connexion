(function(){
    angular
        .module("Connexion")
        .controller("UserLandingController", UserLandingController);

    function UserLandingController($sce, $location, $mdSidenav, $rootScope, PageService, PostService, UserService) {
        var vm = this;
        vm.data = [];
        vm.userId = $rootScope.currentUser._id;
        vm.message =" I'am going to this thing";
        vm.hashtag = "Connexion";
        vm.toggleLeft = toggleLeft('left');
        vm.goToSearch = goToSearch;
        vm.goToProfile = goToProfile;
        vm.goToCreatePost = goToCreatePost;
        vm.googleapiurl = googleapiurl;
        vm.goToPostDetails = goToPostDetails;
        vm.goToUserProfilePage = goToUserProfilePage;
        vm.logout = logout;
        vm.clickTweet = clickTweet;

        function toggleLeft(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {

                    });
            }
        }


        function clickTweet(message){
            var obj = {
                'message' : message,
                'userId' : vm.userId
            };
            UserService.tweet(obj)
                .then(function (succ) {
                    console.log("Tweet Posted");
                },function (err) {
                    console.log("Error while posting tweet");
            });
        }

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
            UserService.findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                    console.log(vm.user);
                })
                .error(function (err) {
                    console.log("User not found",err);
            })
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
