(function(){
    angular
        .module("Connecxion")
        .controller("LandingPageController", LandingPageController);
    function LandingPageController($http, $sce,$mdSidenav) {
        var vm = this;
        vm.data = [];
        $http.get('./assests/connexion-dummy.json').success(function (data) {
            vm.data = data;
            vm.data = vm.data.slice(0, 5);
        });
        vm.imGoing = imGoing;
        vm.showOpenCheck  = showOpenCheck;
        vm.switchChange = switchChange;
        vm.googleapiurl = googleapiurl;
        vm.going = false;
        vm.open = true;
        vm.sideMenu = false;
        vm.toogle = buildToggler('right');
        function buildToggler(navID) {
            return function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
            }
        }
        function switchChange() {
            vm.open = !vm.open;
        }
        function showOpenCheck(d) {
            return d.isOpen || vm.open;
        }
        function imGoing(d) {
            vm.going = true;
            d.noOfPeopleGoing++;
        }
        function googleapiurl(d) {
            var apiKey = "AIzaSyD7GyAN5-7piBEWir3uOPQyxdNTDrjguS8";
            var url = "https://www.google.com/maps/embed/v1/place?key="+ apiKey + "&q=";
            // var location = d.latitude + "," + d.longitude;
            // var location = d.address;
            var location = "Boston";
            url += location;

            return $sce.trustAsResourceUrl(url);
        }
    }
})();    
