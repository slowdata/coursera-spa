(
    function() {
        'use strict';

        angular.module('MenuApp')
        .controller('MenuListController', MenuListController);

        MenuListController.$inject = ['MenuDataService', 'items'];
        function MenuListController(MenuDataService, items) {
            var menuList = this;

            menuList.items = items;

        }
    }
)();