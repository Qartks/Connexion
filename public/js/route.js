(function(){
    angular
        .module('Connecxion')
        .config(Config);
    function Config($routeProvider,$mdThemingProvider) {
        $routeProvider
            .when("/",{
                templateUrl:"./views/user/user-landing-view.client.html",
                controller :"LandingPageController",
                controllerAs :"model"
            })
            .otherwise({
                redirectTo: "/"
            });
        $mdThemingProvider
            $mdThemingProvider.theme('default')
            .primaryPalette('cyan')
            .accentPalette('green')
    }
})();