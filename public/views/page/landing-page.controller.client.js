(function () {
    angular
        .module("Connexion")
        .controller("LandingPageController", LandingPageController);

    function LandingPageController($mdBottomSheet) {
        var vm = this;
        vm.showListBottomSheet = function($event) {
            console.log("first");
            $mdBottomSheet.show({
                templateUrl: './views/page/bottom-sheet-landing-page.view.client.html',
                controller: 'ListBottomSheetCtrl',
                controllerAs : 'model',
                targetEvent: $event
            })
        };


    }

})();