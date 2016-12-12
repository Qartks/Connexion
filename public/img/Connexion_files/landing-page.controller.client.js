(function () {
    angular
        .module("Connexion")
        .controller("LandingPageController", LandingPageController);

    function LandingPageController($mdBottomSheet,$location) {
        var vm = this;
        vm.showListBottomSheet = function($event) {
            console.log("first");
            $mdBottomSheet.show({
                templateUrl: './views/page/bottom-sheet-landing-page.view.client.html',
                controller: 'ListBottomSheetCtrl',
                controllerAs : 'model',
                targetEvent: $event
            }).then(function(answer) {
                if(answer == "Login")
                    $location.url("login");
                else if(answer == "Register")
                    $location.url("register");
                else if(answer == "Explore")
                    $location.url("user");
            }, function() {
            });
        };


    }

})();