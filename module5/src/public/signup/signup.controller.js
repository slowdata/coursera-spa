(function () {
    "use strict";

    angular.module('public')
    .controller('SignupController', SignupController);

    SignupController.$inject = ['SignupService']
    function SignupController(SignupService) {
        var $ctrl = this;
        
        $ctrl.submit = function (form){
            console.log("Este é o submit", form, this.user);

            var tmp = SignupService.getFavDish(this.user.favDish)
            .then(function(res) {
                console.dir(res);
                
            });
            
        }
    }



})();

