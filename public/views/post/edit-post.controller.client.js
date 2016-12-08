(function () {
    angular
        .module("Connexion")
        .controller("EditPostController", EditController);


    function EditController($rootScope, $routeParams, $location, PageService, PostService, UserService, $mdToast, FlickerService) {
        var vm = this;

        vm.userId = $rootScope.currentUser._id;
        vm.postId = $routeParams.postId;
        vm.post = {};

        vm.deleteThisPost = deleteThisPost;
        vm.updateThisPost = updateThisPost;
        vm.deleteThisPic = deleteThisPic;
        vm.goToSearch = goToSearch;
        vm.goToProfile = goToProfile;
        vm.logout = logout;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;


        function goToProfile() {
            $location.url("/user/profile/"+ vm.userId);
        }

        function goToSearch() {
            PageService.setPrevPage("/user/post/"+ vm.postId +"/edit");
            $location.url("/user/search");
        }

        // Functions for Flicker support
        function searchPhotos(searchTerm) {
            vm.photos = null;
            FlickerService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }
        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/"
                + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";

            vm.post.pictures.push(url);

            url = "https://farm" + photo.farm + ".staticflickr.com/"
                + photo.server + "/" + photo.id + "_" + photo.secret + "_s.jpg";

            vm.post.thumbnails.push(url);
        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url("/login");
                })
        }

        function deleteThisPic(index) {
            vm.post.thumbnails.splice(index, 1);
            vm.post.pictures.splice(index, 1);
        }

        function updateThisPost(post) {
            PostService
                .updatePost(vm.postId, post)
                .success(function (page) {
                    showSimpleToast();
                    $location.url("/user/post/"+vm.postId);
                })
                .error(function (err) {
                    console.log(err);
                });
        }

        function showSimpleToast() {

            $mdToast.show(
                $mdToast.simple()
                    .textContent('Updated!')
                    .position('bottom right')
                    .hideDelay(3000)
            );
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

        function init() {
            PostService
                .getPostById(vm.postId)
                .success(function (post) {
                    vm.post = post;
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        init();

    }

})();