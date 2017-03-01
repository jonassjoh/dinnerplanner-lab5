var GeneralController = function (homeView,sideBarView,searchView,dishView,dinnerView) {
  homeView.startButton.click(function(){
    homeView.makeHidden();
    sideBarView.makeVisible();
    searchView.makeVisible();
    $("body").removeClass("background-image");
  });

  searchView.searchResults.click(function(){
    searchView.makeHidden();
    dishView.makeVisible(searchView.selectedDish, searchView.selectedType);
  })

  var backToSearch = function(){
    dishView.makeHidden();
    searchView.makeVisible();
    sideBarView.makeVisible();
  }

  dishView.backButton.click(backToSearch)

  dishView.confirmDishButton.click(backToSearch)


  sideBarView.confirmDinnerButton.click(function() {
    searchView.makeHidden();
    dishView.makeHidden();
    sideBarView.makeHidden();
    dinnerView.makeVisible();
  });

  dinnerView.backButton.click(function(){
    searchView.makeVisible();
    sideBarView.makeVisible();
    dinnerView.makeHidden();
  })
}