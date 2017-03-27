(
    function () {
        'use strict';

        angular.module('data')
        .service('MenuDataService', MenuDataService);

        MenuDataService.$inject = ['$http'];
        function MenuDataService($http) {
            var service = this;

            // getAllCategories - this method should return a promise which is 
            // a result of using the $http service, using the following REST API 
            // endpoint: https://davids-restaurant.herokuapp.com/categories.json
            service.getAllCategories = function () {
                var response = $http({
                    method: "GET",
                    url: 'https://davids-restaurant.herokuapp.com/categories.json'
                }).then(function (result) {
                    var foundItems = result.data;
                    
                    return foundItems;
                });

                return response;
            };


            // getItemsForCategory(categoryShortName) - this method should return 
            // a promise which is a result of using the $http service, 
            // using the following REST API endpoint: 
            // https://davids-restaurant.herokuapp.com/menu_items.json?category=, 
            // where, before the call to the server, your code should append 
            // whatever categoryShortName value was passed in as an 
            // argument into the getItemsForCategory method.
            service.getItemsForCategory = function (categoryShortName) {
                var response = $http({
                    method: "GET",
                    url: 'https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName
                }).then(function (result) {               
                    var foundItems = {};                  
                    foundItems.list = result.data.menu_items;
                    foundItems.short_name = categoryShortName;
                    
                    return foundItems;
                });
                return response;
            };



        }

    }
)();