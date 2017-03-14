(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('URL', 'https://davids-restaurant.herokuapp.com/menu_items.json')
        .directive('foundItems', FoundItemsDirective );


    function FoundItemsDirective () {
        var ddo = {
            templateUrl: 'menuList.html',
            restrict: 'A',
            scope: {
                foundItems: '<'
            }
        };

        return ddo;
    }


    NarrowItDownController.$inject = ['MenuSearchService']
    function NarrowItDownController(MenuSearchService) {
        var Ctrl = this;

        Ctrl.getMenuItems = function(searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
            promise.then(function(response){
                Ctrl.found = response;
                console.log(Ctrl.found);
            })
            .catch(function(error){
                console.log("Error", error);
            });

        };
        

    }


    MenuSearchService.$inject  =['$http', 'URL']
    function MenuSearchService($http, URL) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {

            var response = $http({
                method: "GET",
                url: URL
            }).then(function (result) {
                var foundItems = result.data.menu_items.filter(function(item) {
                    return (item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                });
                return foundItems;
            });

            return response;

        };
    }


})();