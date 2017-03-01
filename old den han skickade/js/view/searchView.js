var SearchView = function (container,model) {

	this.searchField = container.find("#searchField");
	this.searchButton = container.find("#searchButton");
	this.selectTypes = container.find("#selectTypes");
	this.select = container.find("#selectTypes");
	this.searchResults = container.find("#searchResults");
	this.loadingIndicator = container.find("#loadingIndicator");
	this.errorMessage = container.find("#errorMessage");

	//Populate select field
	types = model.getDishTypes();
	for(var i = 0; i<types.length; i++){
		var opt = $("<option>");
		opt.attr("value", types[i].toLowerCase());
		opt.html(types[i]);
		this.selectTypes.append(opt);
	}

	this.showSearchResults = function (dishes) {
		this.searchResults.fadeIn(1000);
		this.searchResults.html('');
		for(var i=0;i<dishes.length;i++){

			var dish = dishes[i]
			newContainer = $("<div>").addClass("col-md-2");
			newContainer.attr("style", "cursor:pointer");
			imgTag = $("<img>").attr("src", "https://spoonacular.com/recipeImages/"+dish.image).addClass("img-responsive img-thumbnail");
			newContainer.append(imgTag);
			label = $("<p>").addClass("center-label").addClass("grey").html(dish.title);
			newContainer.append(label);
			description = $("<p>").html('Ready in ' + dish.readyInMinutes + ' minutes');
			newContainer.append(description);

			// We create a controller for each result because they need 
			// to be clickable
			new ThumbnailViewController(this, newContainer, dish);

			this.searchResults.append(newContainer);
		}
	}

	this.makeHidden = function(){
		container.fadeOut(0);
	}

	this.makeVisible = function(){
		container.fadeIn(1000);
	}

	this.showLoading = function(){
		this.searchResults.fadeOut(0);
		this.errorMessage.fadeOut(0);
		this.loadingIndicator.fadeIn(1000);
	}

	this.hideLoading = function(){
		this.loadingIndicator.fadeOut(0);
	}

	this.showError = function(){
		this.errorMessage.fadeIn(200);
	}

}
