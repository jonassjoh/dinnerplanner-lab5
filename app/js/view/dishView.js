var DishView = function (container,model) {
	this.dishName = container.find("#dishName");
	this.dishImage = container.find("#dishImage")
	this.dishText = container.find("#dishText");
	this.backButton = container.find("#backButton");
	this.confirmDishButton = container.find("#confirmDishButton");
	this.ingredientsTable = container.find("#ingredientsTable");
	this.tableTitle = container.find("#tableTitle");
	this.preparationParagraph = container.find("#preparationParagraph");
	this.dishCost = container.find("#dishCost");
	this.dishDetails = container.find("#dishDetails");
	this.loadingIndicator = container.find("#loadingIndicator");
	this.errorMessage = container.find("#errorMessage");

	this.makeHidden = function(){
		container.fadeOut(0);
	}

	this.makeVisible = function(id, type){
		container.fadeIn(1000);
		this.showLoading();
		var _this = this;
		model.getDish(id, type, function(dish){

			_this.hideLoading();
			_this.showDish(dish);
		},function(){
			_this.showError();
		})
	}

	this.showDish = function (dish) {
		this.dishDetails.fadeIn(1000);
		this.dish = dish;

		this.dishName.html(this.dish.title);
		this.dishImage.attr("src", this.dish.image).addClass('img-responsive');

		this.dishText.html('Ready in ' + this.dish.readyInMinutes + ' minutes');

		this.preparationParagraph.html(this.dish.instructions);

		this.updateIngredients();
	}

	this.updateIngredients = function () {
		this.ingredientsTable.html("");
		var ingredients = this.dish.extendedIngredients;
		var guests = model.getNumberOfGuests();

		this.tableTitle.html(guests);
		for(var i = 0; i<ingredients.length;i++){
			ingredient = ingredients[i];
			tableRow = $("<tr>")
			quantity = $("<td>").html(ingredient.amount * guests + " " +ingredient.unit);
			nameTD = $("<td>").html(ingredient.name);
			currency = $("<td>").html("SEK");
			// price is a hack as we don't have the price in the API
			price = $("<td>").html(ingredient.amount * 1 * guests);
			tableRow.append(quantity, nameTD, currency, price);
			this.ingredientsTable.append(tableRow);
		}

		this.dishCost.html(model.getDishPrice(this.dish) * guests);
	}

	this.showLoading = function(){
		this.dishDetails.fadeOut(0);
		this.errorMessage.fadeOut(0);
		this.loadingIndicator.fadeIn(1000);
	}

	this.hideLoading = function(){
		this.loadingIndicator.fadeOut(0);
	}

	this.showError = function(){
		this.errorMessage.fadeIn(200);
	}

	/*  Observer implementation  */

	// add this view as observer of the model
	model.addObserver(this);

	// update function called every time model changes
	this.update = function(){
		this.updateIngredients();
	}

	
}