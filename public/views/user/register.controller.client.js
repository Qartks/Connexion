(function(){
    angular
        .module("Connexion")
        .controller("UserRegisterController", UserRegisterController);


    function UserRegisterController($location, UserService) {
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
                    UserService.addUser(user)
                        .success(function (user) {
                            if(user == "0") {
                                vm.error = "Unable to Register : Duplicate User";
                            } else {
                                $location.url("/user/" + user._id);
                            }
                        })
                        .error(function (err) {
                            console.log(err);
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