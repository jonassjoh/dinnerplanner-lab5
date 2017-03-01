var RemoveDishButtonController = function(dish, button, model) {
  button.click(function(){
    model.removeDishFromMenu(dish.id);
  })
}