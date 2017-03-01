// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {

  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  $scope.dish = {};

  $scope.test = function () {
    $scope.numberOfGuests = Dinner.getNumberOfGuests();
  }

  var init = function() {
      var res = Dinner.Dish.get({id: $routeParams.dishId.substring(1) });

      res.$promise.then(function(greeting) {
          console.log(greeting);
          $scope.dish = greeting;

      }, function(reason) {
          console.log("Failed");
          console.log(reason);
      });
  }

  init();
});
