var HomeView = function (container,model) {
	this.startButton = container.find("#startButton");

	//No need to implement observer, the view is not affected by the model.

	this.makeHidden = function(){
		container.fadeOut(0);
	}
}