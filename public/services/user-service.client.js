(function () {
    angular
        .module("Connexion")
        .factory("UserService", UserService);


    function UserService($http) {

        return {
            addUser: addUser,
            deleteUser: deleteUser,
            findUserByCredentials: findUserByCredentials
        };

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