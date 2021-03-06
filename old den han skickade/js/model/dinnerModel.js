//DinnerModel Object constructor
var DinnerModel = function() {
 
	var menu = {};
	var numberOfGuests = 1;

	this.setNumberOfGuests = function(num) {
		if(num>0) {
			numberOfGuests = parseInt(num);
			notifyObservers();
		}
	}

	// should return 
	this.getNumberOfGuests = function() {
		return numberOfGuests;
	}

	//Returns the dish that is on the menu for selected type 
	this.getSelectedDish = function(type) {
		return menu[type];
	}

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		var menuDishes = [];
		for(key in menu) {
			menuDishes.push(menu[key]);
		}
		return menuDishes;
	}

	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		var ingredients = {};
		for(dishKey in menu) {
			var dish = menu[dishKey];
			for(ingKey in dish.extendedIngredients) {
				var ingredient = dish.extendedIngredients[ingKey];
				if(ingredients[ingredient.id] !== undefined) {
					ingredients[ingredient.id].amount += ingredient.amount;
				} else {
					ingredients[ingredient.id] = ingredient;
				}
			}
		}
		return ingredients;
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		var ingredients = this.getAllIngredients();
		var sum = 0.;
		for(key in ingredients) {
			sum += parseFloat(ingredients[key].amount) * this.getNumberOfGuests();
		}
		return sum;
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(dish, type) {
		menu[dish.type] = dish; 
		notifyObservers();
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(dish) {
		delete menu[dish.type];
		notifyObservers();
	}

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (type,filter,cb,cbError) {
	  $.ajax( {
	  	url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=' + filter + '&type=' + type,
	  	headers: {
	  			'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
	  	},
	  	success: function(data) {
	  		cb(data.results)
	  	},
	  	error: function(data) {
	  		cbError(data)
	  	}
	  })
	}

	//function that returns a dish of specific ID
	this.getDish = function (id,type,cb,cbError) {
	  $.ajax( {
	  	url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information',
	  	headers: {
	  			'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
	  	},
	  	success: function(data) {
	  		data.type = type;
	  		cb(data)
	  	},
	  	error: function(data) {
	  		cbError(data)
	  	}
	  })
	}

	//function that returns a price of dish given by ID
	this.getDishPrice = function(dish) {		
		var ingredients = dish.extendedIngredients;
		var price = 0;
		for (var i = 0; i < ingredients.length; i++) {
			price += ingredients[i].amount;
		};
		return price;
	}

	//function that returns possible dish types
	this.getDishTypes = function () {
		return ["Appetizer", "Main Course", "Dessert"];
	}

	/*****************************************  
	      Observable implementation    
	*****************************************/

	var observers = [];

	this.addObserver = function(observer) 
	{
		observers.push(observer);
	}

	var notifyObservers = function(arg) 
	{
		for(var i=0; i<observers.length; i++) 
		{
			observers[i].update(arg);
		}	
	}

}
