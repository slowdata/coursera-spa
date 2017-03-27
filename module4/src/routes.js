(
    function () {
        'use strict';

        angular.module('MenuApp')
        .config(RoutesConfig);

        RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
        function RoutesConfig($stateProvider, $urlRouterProvider) {

            // Redirect to home page if no other URL matches
            $urlRouterProvider.otherwise('/');

            // *** Set up UI states ***
            $stateProvider

            // Home page
            .state('home', {
                url: '/',
                templateUrl: 'src/menulist/templates/home.template.html'
            })

            // Categories list page
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/menulist/templates/categories.template.html',
                controller: 'MenuListController as menuList',
                resolve: {
                    items: ['MenuDataService', function (MenuDataService) {
                                return MenuDataService.getAllCategories();
                            }]
                }
            })
            
            // Categories Items page
            .state('items', {
                url: '/items/{itemId}',
                templateUrl: 'src/menulist/templates/items.template.html',
                controller: 'ItemsController as itemsCtrl',
                resolve: {
                    items: ['$stateParams', 'MenuDataService', 
                            function ($stateParams, MenuDataService) {
                                return MenuDataService.
                                    getItemsForCategory($stateParams.itemId.toUpperCase());
                            }]
                }
            })
            ;
        }
    }
)();