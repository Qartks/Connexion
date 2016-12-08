/**
 * Created by Vineeth on 12/7/16.
 */
(function () {
    angular
        .module("Connexion")
        .controller("ListBottomSheetCtrl", ListBottomSheetCtrl);
    function ListBottomSheetCtrl($mdBottomSheet) {
        var vm = this;
        vm.items = [
            { name: 'Login', icon: 'assignment_ind' },
            { name: 'Register', icon: 'new_releases' },
        ];
        vm.listItemClick = listItemClick;
        function listItemClick($index) {
            console.log($index);
        }
    }
})();