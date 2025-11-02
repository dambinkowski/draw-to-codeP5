function FreehandTool(){
	//set an icon and a name for the object
	this.icon = "assets/freehand.png";
	this.name = "freehand";

	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	this.previousMouseX = -1;
	this.previousMouseY = -1;

	this.draw = function(){
		//if the mouse is pressed
		if(mouseIsPressed){
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (this.previousMouseX == -1){
				this.previousMouseX = mouseX;
				this.previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from
			//there to the current mouse location
			else{
				strokeWeight(document.getElementById('strokeWeight').value);
				stroke(document.getElementById('strokeColor').value);
				line(this.previousMouseX, this.previousMouseY, mouseX, mouseY);
				this.previousMouseX = mouseX;
				this.previousMouseY = mouseY;
			}
		}
		//if the user has released the mouse we want to set the this.previousMouse values
		//back to -1.
		//try and comment out these lines and see what happens!
		else{
			this.previousMouseX = -1;
			this.previousMouseY = -1;
		}
	};

	this.unselectTool = () => {
		updatePixels();
		//clear options
		select(".options").html("");
	};

	this.populateOptions = () => {
		select(".options").html(
			`<span class='optionsElement'><label for='strokeWeight'>Stroke Weight: </label><input type='number' id='strokeWeight' value='${currentPenSettings.strokeWeight}'></span>` +
			`<span class='optionsElement'><label for='strokeColor'> Stroke Color: </label><input type='color' id='strokeColor' value='${currentPenSettings.strokeColor}'></span>`
		);
	};

}
