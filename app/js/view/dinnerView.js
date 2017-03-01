var DinnerView = function (container,model) {

	this.backButton = container.find('#backButton');
	this.dinnerItems = container.find('#dinnerItems');
	this.totalCost = container.find('#totalCost');
	this.ingredientsTable = container.find('#ingredients');

	this.makeHidden = function(){
		container.fadeOut(0);
	}

	this.makeVisible = function(){
		container.fadeIn(1000);
		this.update();
	}

	/*  Observer implementation  */

	// add this view as observer of the model
	model.addObserver(this);

	// update function called every time model changes
	this.update = function(){
		// clear previous items in dinner list
		this.dinnerItems.html('');

		var dishes = model.getFullMenu();
		var guests = model.getNumberOfGuests();

		// iterate over the menu and construct the dinner view
		for(i = 0; i < dishes.length; i++) {
			var dish = dishes[i];
			var imgCol = $("<div>").addClass("col-md-4");
			var imgContainer = $("<div>")
			var imgTag = $("<img>").attr("src", dish.image).addClass("img-responsive img-thumbnail")
			var label = $("<p>").addClass("text-center grey").html(dish.title);
			var courseCost = $("<p>").html(model.getDishPrice(dish) * guests + " SEK");
			imgContainer.append(imgTag);
			imgContainer.append(label);
			imgContainer.append(courseCost);
			imgCol.append(imgContainer);
			this.dinnerItems.append(imgCol);	
		}

		this.ingredientsTable.html("");
		var ingredients = model.getAllIngredients();
		
		for(key in ingredients){
			ingredient = ingredients[key];
			tableRow = $("<tr>")
			quantity = $("<td>").html(ingredient.amount * guests + " " +ingredient.unit);
			nameTD = $("<td>").html(ingredient.name);
			currency = $("<td>").html("SEK");
			// price is a hack as we don't have the price in the API
			price = $("<td>").html(ingredient.amount * 1 * guests);
			tableRow.append(quantity, nameTD, currency, price);
			this.ingredientsTable.append(tableRow);
		}	

		// show total cost 
		this.totalCost.html(model.getTotalMenuPrice());

	}
	/*  Observer implementation end  */
}