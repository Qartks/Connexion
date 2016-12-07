(function(){
    angular
        .module('Connexion')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/",{
                templateUrl:"./views/page/landing-page.view.client.html",
                controller :"LandingPageController",
                controllerAs :"model"
            })
            .when("/login",{
                templateUrl:"./views/user/user-login.view.html",
                controller :"UserLoginController",
                controllerAs :"model"
            })
            .when("/register",{
                templateUrl:"./views/user/user-register.view.html",
                controller :"UserRegisterController",
                controllerAs :"model"
            })
            .when("/user/:userId/search",{
                templateUrl:"./views/page/search.view.client.html",
                controller :"SearchController",
                controllerAs :"model"
            })
            .when("/user",{
                templateUrl:"./views/user/user-landing.view.client.html",
                controller :"UserLandingController",
                controllerAs :"model",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/:userId/profile",{
                templateUrl:"./views/user/profile.view.client.html",
                controller :"ProfileController",
                controllerAs :"model"
            })
            .when("/user/:userId/profile/edit",{
                templateUrl:"./views/user/edit-user.view.client.html",
                controller :"UserEditController",
                controllerAs :"model"
            })
            .when("/user/:userId/post/:postId/edit",{
                templateUrl:"./views/post/edit-post.view.client.html",
                controller :"EditPostController",
                controllerAs :"model"
            })
            .when("/user/:userId/post",{
                templateUrl:"./views/post/new-post.view.client.html",
                controller :"NewPostController",
                controllerAs :"model"
            })
            .when("/user/:userId/post/:postId",{
                templateUrl:"./views/post/details-post.view.client.html",
                controller :"DetailsPostController",
                controllerAs :"model"
            })
            .otherwise({
                redirectTo: "/"
            });
    }

    var checkLoggedIn = function ($q, $http, $location, $rootScope) {
        var deferred = $q.defer();
        var url = "/api/loggedin";
        $http.get(url)
            .success(function (user) {
                $rootScope.error = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $rootScope.error = "You need to log in."
                    $location.url("/login");
                }
            });
        return deferred.promise;
    };
})();