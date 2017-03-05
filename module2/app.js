(
    function () {
        'use strict';

        angular.module("ShoppingListCheckOff", [])
            .controller("ToBuyController", ToBuyController)
            .controller("AlreadyBoughtController", AlreadyBoughtController)
            .service();

        
        function ToBuyController () {
            var toBuy = this;

            toBuy.teste = "funciona? - SIM";
        }

        function AlreadyBoughtController() {
            var alreadyB = this;

            alreadyB.teste = "Coisas";
        }
    }
)();