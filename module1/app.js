(function(){
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.checkLunch = function () {
      var lunchValue = $scope.lunch;

      $scope.message = countLunch(lunchValue);

    };

    function countLunch(string) {
      if (string === undefined || string.trim() == "") {
          $scope.infoInput = 'error';
          $scope.msgColor = 'danger';
          return 'Please enter data first';
      }

      var food = string.trim().split(",");
      var total = 0;

      food.forEach(function (str) {
        if (str.trim() !== "") {
          total++;
        }
      });

      $scope.msgColor = 'success';
      $scope.infoInput = 'success';

      if (total <= 3)
        return 'Enjoy!';

      return 'Too much!';



    }
  }


})();
