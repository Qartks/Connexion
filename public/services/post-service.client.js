(function () {
    angular
        .module("Connexion")
        .factory("PostService", PostService);


    function PostService($http) {
        return {
            createPost      : createPost,
            getPostById     : getPostById,
            getPostByUserId : getPostByUserId,
            deletePostById  : deletePostById,
            updatePost      : updatePost,
            getAllOpenPosts : getAllOpenPosts
        };
        
        function getAllOpenPosts(userId) {
            var url = "/api/"+userId+"/allposts";
            return $http.get(url);
        }
        function createPost(userId,newPost){
            var url = "/api/user/"+userId+"/post";
            return $http.post(url,newPost);
        }
        function getPostById(postId){
            var url = "/api/post/"+postId;
            return $http.get(url);
        }
        function getPostByUserId(userId){
            var url = "/api/user/" + userId + "/post/";
            return $http.get(url);
        }
        function deletePostById(userId,postId){
            var url = "/api/user/" + userId + "/post/" + postId;
            return $http.delete(url)
        }
        function updatePost(userId,postId,post){
            var url = "/api/user/" + userId + "/post/"+ postId;
            $http.put(url,post);
        }
    }
})();