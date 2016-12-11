/**
 * Created by Vineeth on 12/7/16.
 */
(function () {
    angular
        .module("Connexion")
        .controller("ListBottomSheetCtrl", ListBottomSheetCtrl);
    function ListBottomSheetCtrl($mdBottomSheet,$location) {
        var vm = this;
        vm.items = [
            { name: 'Explore', icon: 'new_releases' },
            { name: 'Login', icon: 'assignment_ind' },
            { name: 'Register', icon: 'new_releases' },
        ];
        vm.listItemClick = function(option) {
            $mdBottomSheet.hide(option);
        };
    }
})();