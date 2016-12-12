(function () {
    angular
        .module("Connexion")
        .factory("PageService",PageService);
    
    function PageService() {
        var vm = this;
        vm.pageStack = [];
        vm.pop = function() {
            var link = '/user';
            if(vm.pageStack.length>0) link = vm.pageStack.pop();
            return link;
        };
        vm.push = function(link) {
            vm.pageStack.push(link);
        };
        function setPrevPage(url) {
            vm.push(url);
        }
        function getPrevPage() {
            return vm.pop();
        }
        var api = {
            setPrevPage : setPrevPage,
            getPrevPage : getPrevPage
        };
        return api;
    }
})();