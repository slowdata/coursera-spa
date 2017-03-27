(
    function () {
        'use strict';

        angular.module('MenuApp')
        
        .component('categories', {
            templateUrl: 'src/menulist/templates/menulist.template.html',
            bindings: {
                items: '<'
            }
        });
    }
)();