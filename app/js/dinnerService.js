// Here we create an Angular service that we will use for our
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner', function ($resource, $cookies, $localStorage) {


    // TODO in Lab 5: Add your model code from previous labs
    // feel free to remove above example code
    // you will need to modify the model (getDish and getAllDishes)
    // a bit to take the advantage of Angular resource service
    // check lab 5 instructions for details

    var menu = {};
    var numberOfGuests = 1;
    var curType ="";

    if($localStorage.appetizer) menu[test()[0]] = $localStorage.appetizer;
    if($localStorage.maincourse) menu[test()[1]] = $localStorage.maincourse;
    if($localStorage.dessert) menu[test()[2]] = $localStorage.dessert;

    if($cookies.get('guests'))
        numberOfGuests = $cookies.get('guests');
    if($cookies.get('type'))
        curType = $cookies.get('type');

    this.setType = function(t){
      curType = t;
      $cookies.put('type', curType);
    }

    this.getType = function(){
      return curType;
    }

    this.setNumberOfGuests = function(num) {
        if(num>0) {
            numberOfGuests = parseInt(num);
            $cookies.put('guests', numberOfGuests);
            $localStorage.guests = numberOfGuests;
        }
    }

    this.DishSearch = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',{},{
        get: {
            headers: {
                'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
            }
        }
    });
    this.Dish = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/:id/information',{},{
        get: {
            headers: {
                'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
            }
        }
    });

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
        dish.type = type;
        menu[type] = dish;

        if(type == test()[0]) $localStorage.appetizer = dish;
        if(type == test()[1]) $localStorage.maincourse = dish;
        if(type == test()[2]) $localStorage.dessert = dish;

        console.log(dish.type);
        console.log($localStorage.appetizer);

        notifyObservers();
    }

    //Removes dish from menu
    this.removeDishFromMenu = function(dish) {
        delete menu[dish.type];
        if(dish.type == test()[0]) $localStorage.appetizer = null;
        if(dish.type == test()[1]) $localStorage.maincourse = null;
        if(dish.type == test()[2]) $localStorage.dessert = null;
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

    function test() {
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


    // Angular service needs to return an object that has all the
    // methods created in it. You can consider that this is instead
    // of calling var model = new DinnerModel() we did in the previous labs
    // This is because Angular takes care of creating it when needed.
    return this;

});
