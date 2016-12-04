/**
 * Created by Vineeth on 12/3/16.
 */
(function () {
    angular
        .module("Connexion")
        .factory("PostService", PostService);


    function PostService($http) {
        return {
            createPost      : createPost,
            getPostById     : getPostById,
            getPostByUserId : getPostByUserId,
            deletePostById  : deletePostById
        };
        function createPost(){

        }
        function getPostById(){

        }
        function getPostByUserId(){

        }
        function deletePostById(){

        }

    }

})();