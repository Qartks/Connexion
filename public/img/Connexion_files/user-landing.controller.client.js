(function(){
    angular
        .module("Connexion")
        .controller("UserLandingController", UserLandingController);

    function UserLandingController($sce, $location, $mdSidenav, PageService, PostService, UserService, ToastService) {
        var vm = this;
        vm.data = [];

        vm.loggedInUser = {};


        vm.goToSearch = goToSearch;
        vm.goToProfile = goToProfile;
        vm.goToCreatePost = goToCreatePost;
        vm.googleapiurl = googleapiurl;
        vm.goToPostDetails = goToPostDetails;
        vm.goToUserProfilePage = goToUserProfilePage;
        vm.logout = logout;
        vm.clickTweet = clickTweet;
        vm.toggleLeft = toggleLeft('left');
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
                .getAllOpenPosts()
                .success(function (posts) {
                    vm.posts = posts;
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

        init();

        function googleapiurl(d) {
            var apiKey = process.env.GMAP_API_KEY;
            var url = "https://www.google.com/maps/embed/v1/place?key="+ apiKey + "&q=";
            // var location = d.latitude + "," + d.longitude;
            // var location = d.address;
            var location = "Boston";
            url += location;

            return $sce.trustAsResourceUrl(url);
        }

        function goToUserProfilePage(post) {
            PageService.setPrevPage('/user');
            $location.url("/user/profile/" + post.creatorId);
        }

        function goToPostDetails(post) {
            PageService.setPrevPage('/user');
            $location.url("/user/post/" + post._id);
        }

        function goToSearch() {
            PageService.setPrevPage('/user');
            $location.url('/user/search');
        }

        function goToProfile() {
            if (vm.loggedInUser !== '0' ) {
                PageService.setPrevPage('/user');
                $location.url('/user/profile/'+ vm.loggedInUser._id);
            } else {
                ToastService.showToast('You need to login!');
            }
        }

        function goToCreatePost() {
            if (vm.loggedInUser !== '0' ) {
                PageService.setPrevPage('/user');
                $location.url('/user/post/new');
            } else {
                ToastService.showToast('You need to login! ->');
            }
        }

    }
})();    
