(function(){
    angular
        .module("Connecxion")
        .controller("LandingPageController", LandingPageController)
        .controller("DialogController",DialogController);
    function LandingPageController($http, $sce,$mdSidenav,$mdDialog) {
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
        vm.toogle = buildToggler('left');
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
        vm.showAdd = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
                targetEvent: ev,
            })
                .then(function(answer) {
                    $scope.alert = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.alert = 'You cancelled the dialog.';
                });
        };
    }
    function DialogController($http, $sce,$mdSidenav,$mdDialog){
        console.log("Hello");
    }
})();    
