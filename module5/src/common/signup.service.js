(function(){
    'use strict';

    angular.module('common')
    .service('SignupService', SignupService);


    SignupService.$inject = ['ApiPath', '$http'];
    function SignupService(ApiPath, $http) {
        var service = this
        
        service.getFavDish = function(short_name) {
            return $http.get(ApiPath + '/menu_items/' + short_name.toUpperCase() + '.json')
                .then(function (response) {
                    return response.data;
                });
        };

        service.setUser = function (user){
            service.user = user;
        };

        service.getUser = function (){
            return service.user;
        };
    }
})();
