// Dinner controller that we use whenever we have view that needs to
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.getPrice = Dinner.getDishPrice;
  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.incNumberOfGuests = function() {
      Dinner.setNumberOfGuests( Dinner.getNumberOfGuests() + 1 );
  }

  $scope.decNumberOfGuests = function() {
      Dinner.setNumberOfGuests( Dinner.getNumberOfGuests() - 1 );
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.getSelectedDishes = function () {
      return Dinner.getFullMenu();
  }

  $scope.getTotalPrice = function(){
    return Dinner.getTotalMenuPrice();
  }

  $scope.rmFromMenu = function(dish){
    return Dinner.removeDishFromMenu(dish);
  }

  $scope.getMenu = function(){
    return Dinner.getFullMenu();
  }

  $scope.getAllIng = function(){
    return Dinner.getAllIngredients();
  }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});
