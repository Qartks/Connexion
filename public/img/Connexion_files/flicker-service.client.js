/**
 * Created by Vineeth on 12/3/16.
 */
(function(){
    angular
        .module("Connexion")
        .factory("FlickerService",FlickerService);
    function FlickerService($http){
        var api = {
            searchPhotos  : searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var key = "f8101416184c2c0706ce0b29bcb9dd63";
            var secret = "adc0ba7fc60c82fd";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();