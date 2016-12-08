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
            .when("/user/search",{
                templateUrl:"./views/page/search.view.client.html",
                controller :"SearchController",
                controllerAs :"model",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user",{
                templateUrl:"./views/user/user-landing.view.client.html",
                controller :"UserLandingController",
                controllerAs :"model",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/profile/:userId",{
                templateUrl:"./views/user/profile.view.client.html",
                controller :"ProfileController",
                controllerAs :"model",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/profile/:userId/edit",{
                templateUrl:"./views/user/edit-user.view.client.html",
                controller :"UserEditController",
                controllerAs :"model",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/post/:postId/edit",{
                templateUrl:"./views/post/edit-post.view.client.html",
                controller :"EditPostController",
                controllerAs :"model",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/post/new",{
                templateUrl:"./views/post/new-post.view.client.html",
                controller :"NewPostController",
                controllerAs :"model",
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/post/:postId",{
                templateUrl:"./views/post/details-post.view.client.html",
                controller :"DetailsPostController",
                controllerAs :"model",
                resolve : {
                    loggedin: checkLoggedIn
                }
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