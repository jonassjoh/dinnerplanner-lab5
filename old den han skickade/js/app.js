$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
  var homeView = new HomeView($("#homeView"), model);

  var sideBarView = new SideBarView($("#sideBarView"), model);
  var sideBarViewController = new SideBarViewController(sideBarView, model);

  var searchView = new SearchView($('#searchView'), model);
  var searchViewController = new SearchViewController(searchView, model);

  var dishView = new DishView($('#dishView'), model);
  var dishViewController = new DishViewController(dishView, model);

  var dinnerView = new DinnerView($('#dinnerView'), model);

  var generalController = new GeneralController(homeView, sideBarView, searchView, dishView, dinnerView);



});