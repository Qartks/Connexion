(function () {
    angular
        .module("Connexion")
        .controller("DetailsPostController", DetailsPostController);

    function DetailsPostController($routeParams, PostService, PageService, $location) {
        var vm = this;

        vm.userId = $routeParams.userId;
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

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url("/login");
                })
        }

        function editThisPost() {
            $location.url("/user/"+vm.userId+"/post/"+vm.postId+"/edit");
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
            PageService.setPrevPage('/user/' + vm.userId + '/post/' + vm.postId);
            $location.url('/user/'+ vm.userId + '/search');
        }

        function goToProfile() {
            $location.url('/user/' + vm.userId + '/profile');
        }

        function goToCreatePost() {
            $location.url('/user/' + vm.userId + '/post');
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

            jQuery(function(){
                jQuery('#details').show();
                jQuery('#images').hide();
                jQuery('#location').hide();

                jQuery('#details-button').click(function(){
                    jQuery('#details').show();
                    jQuery('#images').hide();
                    jQuery('#location').hide();
                });
                jQuery('#images-button').click(function(){
                    jQuery('#details').hide();
                    jQuery('#images').show();
                    jQuery('#location').hide();
                });
                jQuery('#location-button').click(function(){
                    jQuery('#details').hide();
                    jQuery('#images').hide();
                    jQuery('#location').show();
                });
            });
        }
        init();
    }
})();

