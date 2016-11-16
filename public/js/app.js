(function () {
    angular.module('Connexion',['ngMaterial','ngRoute'])
        .config(function ($mdThemingProvider, $mdAriaProvider) {
            $mdThemingProvider
                .theme('default')
                .primaryPalette('cyan')
                .accentPalette('green');

            $mdAriaProvider.disableWarnings();
        });
})();