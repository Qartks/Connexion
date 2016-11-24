(function(){
    angular
        .module('Connexion')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/",{
                templateUrl:"./views/user/user-landing.view.client.html",
                controller :"UserLandingController",
                controllerAs :"model"
            })
            .when("/user/login",{
                templateUrl:"./views/user/user-login.view.html",
                controller :"UserLoginController",
                controllerAs :"model"
            })
            .when("/user/register",{
                templateUrl:"./views/user/user-register.view.html",
                controller :"UserRegisterController",
                controllerAs :"model"
            })
            .when("/user/:userId/search",{
                templateUrl:"./views/page/search.view.client.html",
                controller :"SearchController",
                controllerAs :"model"
            })
            .when("/user/:userId",{
                templateUrl:"./views/user/user-landing.view.client.html",
                controller :"UserLandingController",
                controllerAs :"model"
            })
            .when("/user/:userId/profile",{
                templateUrl:"./views/user/profile.view.client.html",
                controller :"ProfileController",
                controllerAs :"model"
            })
            .when("/user/:userId/post/:postId",{
                templateUrl:"./views/post/edit-post.view.client.html",
                controller :"EditPostController",
                controllerAs :"model"
            })
            .when("/user/:userId/post",{
                templateUrl:"./views/post/new-post.view.client.html",
                controller :"NewPostController",
                controllerAs :"model"
            })
            .otherwise({
                redirectTo: "/"
            });
    }
})();