(function () {
    angular
        .module("Connexion")
        .controller("NewPostController", NewPostController)
    function NewPostController($rootScope, $location, $sce, FlickerService, PostService, PageService, UserService, $mdSidenav) {
        var vm = this;
        vm.result ='';
        vm.userId = $rootScope.currentUser._id;
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
        vm.goBack = goBack;
        vm.toggleLeft = toggleLeft('left');

        function toggleLeft(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {

                    });
            }
        }

        function goBack() {
            $location.url(PageService.getPrevPage());
        }

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
            post.email = vm.user.email || "";
            post.phone = vm.user.phone || "";
            post.address = vm.user.address.formatted_address;
            post.latitude = vm.user.address.geometry.location.lat();
            post.longitude = vm.user.address.geometry.location.lng();
            post.pictures = fullPic;
            post.thumbnails = vm.pictures;
            PostService.createPost(vm.userId, post)
                .success(function (some) {
                    $location.url('/user/profile/'+ vm.userId );
                })
                .error(function (err) {
                    console.log(err);
                });
        }

        function goToProfile() {
            PageService.setPrevPage('/user/post/new');
            $location.url('/user/profile/'+ vm.userId );
        }

        function goToSearch() {
            PageService.setPrevPage('/user/post/new');
            $location.url('/user/search');
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