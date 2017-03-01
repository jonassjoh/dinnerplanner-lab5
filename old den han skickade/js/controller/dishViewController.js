var DishViewController = function (view, model) {

	view.confirmDishButton.click(function(){
		model.addDishToMenu(view.dish);
	});
}