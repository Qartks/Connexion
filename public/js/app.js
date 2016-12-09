(function () {
    angular.module('Connexion',['ngMaterial','ngRoute'])
        .config(function ($mdThemingProvider, $mdAriaProvider) {
            $mdThemingProvider
                .theme('default')
                .primaryPalette('blue')
                .accentPalette('green');
            $mdAriaProvider.disableWarnings();
        });
})();