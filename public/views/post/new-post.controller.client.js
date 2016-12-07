(function () {
    angular
        .module("Connexion")
        .controller("NewPostController", NewPostController)
    function NewPostController($routeParams, $location, $sce, FlickerService, PostService, PageService, UserService) {
        var vm = this;

        vm.userId = $routeParams.userId;
        vm.user = {};
        vm.post = {};
        vm.pictures = [];
        var fullPic = [];

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;
        vm.goToSearch = goToSearch;
        vm.goToProfile = goToProfile;
        vm.createPost = createPost;
        vm.logout = logout;
        vm.deleteThisPic = deleteThisPic;

        function deleteThisPic(index) {
            vm.pictures.splice(index, 1);
            fullPic.splice(index, 1);
        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url("/login");
                })
        }

        function createPost(post) {
            post.organizer = vm.user.username;
            post.creatorId = vm.userId;
            post.email = vm.user.email;
            post.phone = vm.user.phone;
            post.address = vm.user.address;
            post.pictures = fullPic;
            post.thumbnails = vm.pictures;

            PostService.createPost(vm.userId, post)
                .success(function (some) {
                    $location.url('/user/' + vm.userId + '/profile');
                })
                .error(function (err) {
                    console.log(err);
                });
        }

        function goToProfile() {
            $location.url('/user/'+ vm.userId + '/profile');
        }

        function goToSearch() {
            PageService.setPrevPage('/user/'+ vm.userId + '/post');
            $location.url('/user/'+ vm.userId + '/search');
        }
        
        function init() {
            UserService.findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                })
                .error(function (err) {
                    console.log(err);
                });
            vm.photos = null;
        }
        init();


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

            fullPic.push(url);

            url = "https://farm" + photo.farm + ".staticflickr.com/"
                + photo.server + "/" + photo.id + "_" + photo.secret + "_s.jpg";

            vm.pictures.push(url);
        }
    }

})();