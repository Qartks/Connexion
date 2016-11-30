(function () {
    angular
        .module("Connexion")
        .factory("UserService", UserService);


    function UserService($http) {

        return {
            login: login,
            register: register,
            addUser: addUser,
            deleteUser: deleteUser,
            findUserByCredentials: findUserByCredentials
        };
        
        function register(user) {
            return $http.post("/api/register", user);
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function addUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+ username+"&password=" +password;
            return $http.get(url);
        }
    }

})();