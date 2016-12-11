(function () {
    angular
        .module("Connexion")
        .controller("UserLoginController", UserLoginController);


    function UserLoginController($location, UserService, $scope){
        var vm = this;

        vm.error = "";

        vm.goToRegister = goToRegister;
        vm.login = login;
        vm.submit = submit;
        
        
        function submit() {
            login(vm.user);
        }

        function goToRegister() {
            $location.url("/register");
        }

        function login(user) {
            if (!user) {
                vm.error = "Type Something, mate!";
                return;
            }

            if (!$scope.userForm.$valid) {
                vm.error = "There are invalid fields";
                return;
            }

            UserService.login(user)
                .success(function (user) {
                    if(user !== "0") {
                        $location.url("/user");
                    }
                })
                .error(function (err) {
                    vm.user={};
                    vm.error = "No Such User";
                    console.log(err);
                });
        }
    }
})();