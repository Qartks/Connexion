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
                controllerAs :"model"
            })
            .when("/user",{
                templateUrl:"./views/user/user-landing.view.client.html",
                controller :"UserLandingController",
                controllerAs :"model"
            })
            .when("/user/profile/:userId",{
                templateUrl:"./views/user/profile.view.client.html",
                controller :"ProfileController",
                controllerAs :"model"
            })
            .when("/user/profile/:userId/edit",{
                templateUrl:"./views/user/edit-user.view.client.html",
                controller :"UserEditController",
                controllerAs :"model",
                resolve : {
                    loggedin: checkLoggedIn,
                    isProfileOwn: isProfileOwn
                }
            })
            .when("/user/post/:postId/edit",{
                templateUrl:"./views/post/edit-post.view.client.html",
                controller :"EditPostController",
                controllerAs :"model",
                resolve : {
                    loggedin: checkLoggedIn,
                    isPostOwner: isPostOwner
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
                controllerAs :"model"
            })
            .otherwise({
                redirectTo: "/"
            });
    }

    var isProfileOwn = function ($q, $http, $location, $rootScope, $routeParams, UserService) {
        var deferred = $q.defer();
        var userId = $routeParams.userId;
        var url = "/api/loggedin";

        $http.get(url)
            .success(function (user) {
                $rootScope.error = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                }

                if ($rootScope.currentUser) {
                    if (userId == $rootScope.currentUser._id || ($rootScope.currentUser.role ==="admin")) {
                        deferred.resolve();
                    } else {
                        console.log("You're trying to do a bad thing!");
                        $http.post("/api/logout");
                        $location.url("/login");
                    }
                } else {
                    console.log("Please login ! ");
                    deferred.reject();
                    $location.url("/login");
                }
            });

        return deferred.promise;
    };

    var isPostOwner = function ($q, $http, $location, $rootScope, $routeParams, PostService) {
        var deferred = $q.defer();
        var postId = $routeParams.postId;
        var url = "/api/loggedin";
        $http.get(url)
            .success(function (user) {
                $rootScope.error = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                }

                if ($rootScope.currentUser) {
                    PostService
                        .getPostById(postId)
                        .success(function (post) {
                            if (post.creatorId === $rootScope.currentUser._id || $rootScope.currentUser.role==="admin") {
                                deferred.resolve();
                            } else {
                                deferred.reject();
                                console.log("You're trying to do a bad thing!");
                                $http.post("/api/logout");
                                $location.url("/login");
                            }
                        });
                } else {
                    console.log("Please login ! ");
                    deferred.reject();
                    $location.url("/login");
                }
            });

        return deferred.promise;
    };

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
                    $rootScope.error = "You need to log in.";
                    $location.url("/login");
                }
            });
        return deferred.promise;
    };
})();