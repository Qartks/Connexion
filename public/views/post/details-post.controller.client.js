(function () {
    angular
        .module("Connexion")
        .controller("DetailsPostController", DetailsPostController);

    function DetailsPostController($rootScope, $routeParams, PostService, PageService, $location, UserService, uiGmapGoogleMapApi) {
        var vm = this;

        vm.userId = $rootScope.currentUser._id;
        vm.postId = $routeParams.postId;
        vm.post = {};
        vm.goToSearch = goToSearch;
        vm.goToProfile = goToProfile;
        vm.goToCreatePost = goToCreatePost;
        vm.getComments = getComments;
        vm.isThisMine = isThisMine;
        vm.editThisPost = editThisPost;
        vm.deleteThisPost = deleteThisPost;
        vm.logout = logout;
        vm.map = { center: { latitude: 42.3601, longitude: -71.0589 }, zoom: 4 };
        vm.marker= {latitude: 40.1451, longitude: -99.6680 }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url("/login");
                })
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
            return vm.post.creatorId === vm.userId;
        }

        function goToSearch() {
            PageService.setPrevPage('/user/post/' + vm.postId);
            $location.url('/user/search');
        }

        function goToProfile() {
            $location.url('/user/profile/' + vm.userId);
        }

        function goToCreatePost() {
            $location.url('/user/post/new');
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

