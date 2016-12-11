(function () {
    angular
        .module("Connexion")
        .controller("DetailsPostController", DetailsPostController);

    function DetailsPostController($rootScope, $routeParams, PostService, PageService, $location, UserService, ToastService) {
        var vm = this;

        vm.postId = $routeParams.postId;
        vm.post = {};
        vm.loggedInUser= {};

        vm.toggleLeft = toggleLeft('left');
        vm.map = { center: { latitude: 42.3601, longitude: -71.0589 }, zoom: 4 };
        vm.marker= {latitude: 40.1451, longitude: -99.6680 };

        vm.comments = [];

        vm.goToSearch = goToSearch;
        vm.goToProfile = goToProfile;
        vm.goToCreatePost = goToCreatePost;
        vm.getComments = getComments;
        vm.sendComment = sendComment;
        vm.isThisMine = isThisMine;
        vm.editThisPost = editThisPost;
        vm.deleteThisPost = deleteThisPost;
        vm.imGoing = imGoing;
        vm.imInterested = imInterested;
        vm.isLoggedIn = isLoggedIn;
        vm.logout = logout;

        function imGoing() {
            if (vm.post.going.indexOf(vm.loggedInUser._id) == -1) {
                vm.post.going.push(vm.loggedInUser._id);
            }
            vm.post.noOfPeopleGoing = vm.post.going.length;
            PostService
                .updatePost(vm.postId, vm.post)
                .success(function (post) {
                    vm.post = post;
                })
                .error(function (err) {
                    console.log(err);
                });
        }
        
        function imInterested() {
            if (vm.post.interested.indexOf(vm.loggedInUser._id) == -1) {
                vm.post.interested.push(vm.loggedInUser._id);
            }
            vm.post.noOfPeopleTalkingAbout = vm.post.interested.length;
            PostService
                .updatePost(vm.postId, vm.post)
                .success(function (post) {
                    vm.post = post;
                })
                .error(function (err) {
                    console.log(err);
                });
        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url("/login");
                })
        }

        function toggleLeft(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {

                    });
            }
        }
        
        function sendComment(cmt) {
            vm.newComment = "";
            var newComment = {
                userId          : vm.loggedInUser._id,
                username        : vm.loggedInUser.username,
                profilePicture  : vm.loggedInUser.profilePicture,
                text            : cmt
            };

            PostService
                .updateCommentsForPostId(vm.postId, newComment)
                .success(function (post) {
                    vm.post = post;
                })
                .error(function (err) {
                    console.log(err);
                });
        }

        function editThisPost() {
            $location.url("/user/post/"+vm.postId+"/edit");
        }

        function deleteThisPost() {
            PostService
                .deletePostById(vm.postId)
                .success(function (obj) {
                    vm.post = {};
                })
                .error(function (err) {
                    console.log(err);
                });
            $location.url("/user");
        }
        
        function getComments() {

        }

        function isThisMine() {
            if(isLoggedIn()) {
                return vm.post.creatorId === vm.loggedInUser._id || vm.loggedInUser.role==="admin";
            }
        }

        function goToSearch() {
            PageService.setPrevPage('/user/post/' + vm.postId);
            $location.url('/user/search');
        }

        function goToProfile() {
            if (isLoggedIn()) {
                PageService.setPrevPage('/user/post/' + vm.postId);
                $location.url('/user/profile/' + vm.loggedInUser._id);
            } else {
                ToastService.showToast("Login already!");
            }
        }

        function goToCreatePost() {
            if (isLoggedIn()) {
                PageService.setPrevPage('/user/post/' + vm.postId);
                $location.url('/user/post/new');
            } else {
                ToastService.showToast("Please Login");
            }
        }

        function isLoggedIn() {
            return vm.loggedInUser !== '0';
        }

        function init(){

            PostService
                .getPostById(vm.postId)
                .success(function (p) {
                    vm.post = p;
                })
                .error(function (err) {
                    console.log(err);
            });

            UserService
                .getLoggedInUser()
                .success(function (user) {
                    vm.loggedInUser = user;
                });

            $(document ).ready(function() {
                $('#details').show();
                $('#images').hide();
                $('#location').hide();

                $('#details-button').click(function(){
                    $('#details').show();
                    $('#images').hide();
                    $('#location').hide();
                });
                $('#images-button').click(function(){
                    $('#details').hide();
                    $('#images').show();
                    $('#location').hide();
                });
                $('#location-button').click(function(){
                    $('#details').hide();
                    $('#images').hide();
                    $('#location').show();
                });
            });

        }
        init();
    }
})();

