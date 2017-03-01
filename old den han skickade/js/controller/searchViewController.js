var SearchViewController = function(view, model) {
	// Subscribe to change in values in the select field
	view.selectTypes.on('change', function(){
		search(view.selectTypes.val(), "");
	});

	// Set onclick for the search button
	view.searchButton.click(function(event){
		search(view.selectTypes.val(), view.searchField.val());
	});


	var search = function(type, filter){
		view.selectedType = type;
		view.showLoading();
		model.getAllDishes(type,filter,function(dishes){
			view.hideLoading();
			view.showSearchResults(dishes);
		},function(dishes){
			view.hideLoading();
			view.showError();
		})
	}


}