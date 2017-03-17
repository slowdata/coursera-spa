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
            restrict: 'E',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: MenuListDirectiveController,
            controllerAs: 'list',
            bindToController: true,
            link: MenuListDirectiveLink
        };

        return ddo;
    }

    function MenuListDirectiveLink(scope, element, attr, controller) {
        console.log(scope, element, attr, controller);
    }

    function MenuListDirectiveController() {
        var list = this;

        list.show = function() {
            if (list.foundItems !== undefined)
                if (list.foundItems.length > 0)
                    return true;
            return false;


        }

        if (list.foundItems !== undefined)
            if (list.foundItems.length > 0)
                list.show = true;

    }

    NarrowItDownController.$inject = ['MenuSearchService']
    function NarrowItDownController(MenuSearchService) {
        var Ctrl = this;

        Ctrl.searchTerm = '';

        Ctrl.getMenuItems = function(searchTerm) {
            Ctrl.found = '';
            Ctrl.show = false;

            if (searchTerm.trim() !== "") {
                var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
                promise.then(function(response){
                    if (response.length > 0)
                        Ctrl.found = response;
                    else
                        Ctrl.show = true;
                    
                })
                .catch(function(error){
                    console.log("Error", error);
                });
            } else {
                Ctrl.show = true;
            }

        };

        Ctrl.removeItem = function (index) {
            console.log("this do onRemove: ", this);
            if (Ctrl.found.length > 0) {
                Ctrl.found.splice(index, 1);
            }

                
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
                    return (item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                });
                return foundItems;
            });

            return response;
        };
        
    }


})();