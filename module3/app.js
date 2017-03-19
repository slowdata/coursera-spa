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
                onRemove: '&',
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

        scope.$watch('list.foundItems', function(newValue, oldValue){
            console.log('newValue: ', newValue);
            console.log('oldValue: ', oldValue);

            if (!newValue) {
                var el = element.find('span');
                el.css('display', 'block');
            } else {
                var el = element.find('span');
                el.css('display', 'none');
            }
        });


    }

    function MenuListDirectiveController() {
        var list = this;

        list.show = function() {
            if (list.foundItems !== undefined)
                if (list.foundItems.length > 0)
                    return true;
            return false;

        }

    }

    NarrowItDownController.$inject = ['MenuSearchService']
    function NarrowItDownController(MenuSearchService) {
        var Ctrl = this;

        Ctrl.searchTerm = '';

        Ctrl.getMenuItems = function(searchTerm) {
            Ctrl.show = true;

            Ctrl.foundItems = '';

            if (searchTerm.trim() !== "") {
                var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
                promise.then(function(response){
                    if (response.length > 0)
                        Ctrl.foundItems = response;
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
            if (Ctrl.foundItems.length > 0) {
                Ctrl.foundItems.splice(index, 1);
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