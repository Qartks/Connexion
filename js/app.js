(function () {
    angular.module('Connecxion',['ngMaterial'])
        .controller('myController', ['$http', '$sce', appController]);
    
    
    
    function appController($http, $sce) {
        var self = this;

        self.data = [];

        $http.get('connexion-dummy.json').success(function (data) {
            self.data = data;
            self.data = self.data.slice(0, 5);
        });

        self.imGoing = imGoing;
        self.showOpenCheck  = showOpenCheck;
        self.switchChange = switchChange;
        self.googleapiurl = googleapiurl;
        self.going = false;
        self.open = true;

        function switchChange() {
            self.open = !self.open;
        }
        function showOpenCheck(d) {
            return d.isOpen || self.open;
        }
        function imGoing(d) {
            self.going = true;
            d.noOfPeopleGoing++;
        }
        function googleapiurl(d) {
            var url = "https://www.google.com/maps/embed/v1/place?key="+ apiKey + "&q=";
            // var location = d.latitude + "," + d.longitude;
            // var location = d.address;
            var location = "Boston";
            url += location;

            return $sce.trustAsResourceUrl(url);
        }
    }
})();