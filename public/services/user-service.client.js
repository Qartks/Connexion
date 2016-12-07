(function () {
    angular
        .module("Connexion")
        .factory("UserService", UserService);


    function UserService($http) {

        return {
            login: login,
            logout: logout,
            register: register,
            addUser: addUser,
            deleteUser: deleteUser,
            findUserByCredentials: findUserByCredentials,
            findUserById : findUserById,
            updateUser : updateUser,
            getAllValidUsers : getAllValidUsers
        };

        function getAllValidUsers(userId) {
            return $http.get("/api/"+ userId + "/users");
        }

        function updateUser(user) {
            return $http.put("/api/user/" + user._id, user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }
        
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