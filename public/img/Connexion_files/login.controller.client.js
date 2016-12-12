(function () {
    angular
        .module("Connexion")
        .controller("UserLoginController", UserLoginController);


    function UserLoginController($location, UserService){
        var vm = this;

        vm.error = "";

        vm.goToRegister = goToRegister;
        vm.login = login;

        function goToRegister() {
            $location.url("/register");
        }

        function login(user) {
            if (!user) {
                vm.error = "Type Something, mate!";
                return;
            }

            // UserService.findUserByCredentials(user.username, user.password)
            UserService.login(user)
                .success(function (user) {
                    if(user === "0") {
                        vm.error = "No Such user";
                    } else {
                        $location.url("/user");
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
        }
    }
})();