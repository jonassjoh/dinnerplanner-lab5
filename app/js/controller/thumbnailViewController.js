var ThumbnailViewController = function (parent, view, dish) {
	view.click(function() {
		parent.selectedDish = dish.id;
	});
}