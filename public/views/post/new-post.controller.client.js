(function () {
    angular
        .module("Connexion")
        .controller("NewPostController", NewPostController)
    function NewPostController($routeParams, $location, $sce, FlickerService, PostService, PageService, UserService) {
        var vm = this;

        vm.userId = $routeParams.userId;
        vm.user = {};
        vm.organizerName = {};

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;
        vm.goToSearch = goToSearch;
        vm.goToProfile = goToProfile;
        vm.createPost = createPost;

        function getName() {
            vm.organizerName = vm.user.name ? vm.name : vm.user.username;
        }

        function createPost(post) {
            post.organizer = vm.organizerName;
            post.creatorId = vm.userId;
            PostService.createPost(vm.userId, post)
                .success(function (some) {
                    vm.post = {};
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
                    getName();
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
                    console.log(vm.photos)
                });
        }
        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/"
                + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";
            console.log(url);
        }
    }

})();