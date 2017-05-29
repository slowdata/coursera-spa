(function () {
    "use strict";

    angular.module('public')
    .controller('SignupController', SignupController);

    SignupController.$inject = ['SignupService']
    function SignupController(SignupService) {
        var $ctrl = this;

        $ctrl.submit = function (form){
            $ctrl.res = false;
            $ctrl.errorShortName = $ctrl.errorShortName ? false : $ctrl.errorShortName;

            console.log("Este é o submit", $ctrl.user);

            SignupService.getFavDish(this.user.favDish)
            .then(function(res) {
                SignupService.setUser($ctrl.user);
                $ctrl.res = true;
            }).catch(function(err){
                $ctrl.errorShortName = true;
            });
            
        }
    }



})();

