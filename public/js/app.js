(function () {
    angular.module('Connexion',['ngMaterial','ngRoute','uiGmapgoogle-maps'])
        .config(function ($mdThemingProvider, $mdAriaProvider,uiGmapGoogleMapApiProvider) {
            $mdThemingProvider
                .theme('default')
                .primaryPalette('blue')
                .accentPalette('green');
            $mdAriaProvider.disableWarnings();
            uiGmapGoogleMapApiProvider.configure({
                key: 'AIzaSyC05DoMJl9lQJ059k1f3rXDh5lmPL8Q_IY',
                v: '3.27',
                libraries: 'weather,geometry,visualization'
            });
        });
})();