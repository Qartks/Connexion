(function(){
    angular
        .module('Connecxion')
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/",{
                templateUrl:"./views/user/user-landing-view.client.html",
                controller :"LandingPageController",
                controllerAs :"model"
            })
            .otherwise({
                redirectTo: "/"
            });
    }
})();