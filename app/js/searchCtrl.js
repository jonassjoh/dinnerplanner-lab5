// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner) {

    // TODO in Lab 5: you will need to implement a method that searchers for dishes
    // including the case while the search is still running.

    $scope.getDishTypes = Dinner.getDishTypes();

    $scope.searchResults = [];
    $scope.searchType = $scope.getDishTypes[0];

    $scope.searching = false;
    $scope.error = false;

    $scope.searchDishes = function() {
        var dishType = $scope.searchType;
        $scope.searchResults = [];
        $scope.searching = true;
        $scope.error = false;

        var res = Dinner.DishSearch.get({query: $scope.searchQuery ,type: dishType});
        Dinner.setType(dishType);
        res.$promise.then(function(greeting) {
            $scope.searching = false;

            $scope.showSearchResults(greeting, dishType);

        }, function(reason) {
            $scope.searching = false;
            $scope.error = true;
            alert('Failed: ' + reason);
        });
    }

    $scope.showSearchResults =  function(dishes, type) {
        for(var i=0;i<dishes.results.length;i++){
            var dish = dishes.results[i];
            $scope.searchResults.push(dish);
        }
    }
});
