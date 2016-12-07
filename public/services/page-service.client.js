(function () {
    angular
        .module("Connexion")
        .factory("PageService",PageService);
    
    function PageService() {
        var previousPage = {};

        var api = {
            setPrevPage : setPrevPage,
            getPrevPage : getPrevPage
        };
        return api;


        function setPrevPage(pageurl) {
            previousPage = pageurl;
        }

        function getPrevPage() {
            return previousPage;
        }

    }

})();