(function(){
    angular
        .module("Connexion")
        .controller("UserRegisterController", UserRegisterController);


    function UserRegisterController($rootScope, $location, UserService) {
        var vm = this;
        vm.error = "";
        vm.user = {};
        
        vm.registerUser = registerUser;
        vm.goBack = goBack;
        
        function goBack() {
            $location.url("/login");
        }
        
        function registerUser(user) {

            if (user.username && user.password) {
                if (user.password === user.passwordVerify) {
                    UserService
                        .register(user)
                        .then(
                            function(response) {
                                if (response.data == "0") {
                                    vm.error = "Username already exists";
                                    vm.user = {};
                                } else {
                                    var user = response.data;
                                    $rootScope.currentUser = user;
                                    $location.url("/user/"+ $rootScope.currentUser._id +"/profile/edit");
                                }
                            });
                } else {
                    vm.error = "Make sure passwords match";
                }
            } else {
                vm.error = "Please enter values for all fields";
            }

        }
    }
})();