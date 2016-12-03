(function () {
    angular
        .module("Connexion")
        .controller("NewPostController", NewPostController)
    function NewPostController($routeParams,$location,$sce,FlickerService) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;
        function init() {
            vm.photos = vm.searchPhotos("Nature");
        }
        init()
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