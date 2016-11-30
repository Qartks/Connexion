(function(){
    angular
        .module("Connexion")
        .controller("UserLandingController", UserLandingController);

    function UserLandingController($http, $sce) {
        var vm = this;
        vm.data = [];
        $http.get('./assests/connexion-dummy.json').success(function (data) {
            vm.data = data;
            vm.data = vm.data.slice(0, 5);
        });

        vm.googleapiurl = googleapiurl;

        function googleapiurl(d) {
            var apiKey = process.env.GMAP_API_KEY;
            var url = "https://www.google.com/maps/embed/v1/place?key="+ apiKey + "&q=";
            // var location = d.latitude + "," + d.longitude;
            // var location = d.address;
            var location = "Boston";
            url += location;

            return $sce.trustAsResourceUrl(url);
        }

    }
})();    
