var SideBarView = function (container,model) {

	this.numberOfGuests = container.find("#numberOfGuests");
	this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");
	this.totalPrice = container.find("#totalPrice");
	this.confirmDinnerButton = container.find("#confirmDinnerButton");
	this.menuTable = container.find("#sideMenuTable");

	model.addObserver(this);

	//This function gets called when there is a change at the model
	this.update = function(arg){
		var menu = model.getFullMenu();
		this.menuTable.find("tr.dishRow").remove();
		for (var i = 0; i < menu.length; i++) {
			var tr = $("<tr class='dishRow'>");
			tr.attr('data-dish-id',menu[i].id);
			var tdName = $("<td>");
			tdName.html(menu[i].title);
			var tdPrice = $("<td>");
			var price = model.getDishPrice(menu[i]);
			tdPrice.html(price * model.getNumberOfGuests() + " SEK");
			var tdRemove = $("<td>");
			var removeBtn = $("<button class='btn btn-xs btn-danger'>X</button>")

			// we create a controller for the remove dish button, 
			// since the button is a very simple "view" we don't need
			// to create a special view code for it, but just pass the 
			// button it self to the controller. We also pass the 
			// menu item, so that controller knows which item to remove
			// from the model. By having such controller, we can
			// reuse it in other places in our app, not just in the
			// sidebar.
			new RemoveDishButtonController(menu[i],removeBtn,model);
			
			tr.append(tdName);
			tr.append(tdPrice);
			tr.append(removeBtn);
			this.menuTable.append(tr);
		};

		if (model.getFullMenu().length == 0) {
			this.confirmDinnerButton.addClass('disabled');
		}else{
			this.confirmDinnerButton.removeClass('disabled');
		}

		this.numberOfGuests.html(model.getNumberOfGuests());
		this.totalPrice.html(model.getTotalMenuPrice());
	}

	this.makeHidden = function(){
		container.fadeOut(0);
	}

	this.makeVisible = function(){
		// We call update to ensure the first time the view is shown 
		// it is also up to date
		this.update()
		container.fadeIn(1000);
	}

	
	
}