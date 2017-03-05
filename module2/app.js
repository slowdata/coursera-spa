(
    function () {
        'use strict';

        angular.module("ShoppingListCheckOff", [])
            .controller("ToBuyController", ToBuyController)
            .controller("AlreadyBoughtController", AlreadyBoughtController)
            .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

        
        ToBuyController.$inject = ["ShoppingListCheckOffService"];
        function ToBuyController (ShoppingListCheckOffService) {
            var toBuy = this;

            toBuy.items = ShoppingListCheckOffService.getToBuyList();

            toBuy.removeItem = function(item) {
                ShoppingListCheckOffService.buyItem(item);
            }

        }

        AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"]
        function AlreadyBoughtController(ShoppingListCheckOffService) {
            var alreadyB = this;

            alreadyB.items = ShoppingListCheckOffService.getBoughtList();
        }



        function ShoppingListCheckOffService() {
            var service = this;

            var tobuy = [{
                name: "cookie bags",
                quantity: 10
            },{
                name: "red wine bottles",
                quantity: 2
            },
            {
                name: "chip bags",
                quantity: 1
            },
            {
                name: "cheese",
                quantity: 2
            },
            {
                name: "milk",
                quantity: 1
            }];
            
            var bought = [];

            service.getToBuyList = function () {
                return tobuy;
            };

            service.getBoughtList = function () { 
                return bought;
            };

            service.buyItem = function (itemIndex) {
                bought.push(tobuy[itemIndex]);
                tobuy.splice(itemIndex, 1);
            }

        }
    }
)();