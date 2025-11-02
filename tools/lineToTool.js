//a tool for this.drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before this.drawing the line to the
//pixel array.
function LineToTool(){
	this.icon = "assets/lineTo.png";
	this.name = "LineTo";

	this.stortMouseX = -1;
	this.stortMouseY = -1;
	this.drawing = false;
	this.codedLine = "";

	//draws the line to the screen
	this.draw = function(){
		//only draw when mouse is clicked on canvas
		if(mouseIsPressed && MouseIsOnCanvas()){
			//if it's the start of this.drawing a new line
			if(this.stortMouseX == -1){
				this.stortMouseX = mouseX;
				this.stortMouseY = mouseY;
				this.drawing = true;
				//save the current pixel Array
				loadPixels();
			} else {
				//update the screen with the saved pixels to hide any previous
				//line between mouse pressed and released
				updatePixels();
				//draw the line
				strokeWeight(document.getElementById('strokeWeight').value);
				stroke(document.getElementById('strokeColor').value);
				line(this.stortMouseX, this.stortMouseY, mouseX, mouseY);
			}
		} else if (this.drawing) {
			//save the pixels with the most recent line and reset the
			//this.drawing bool and start locations
			// if the begining and end of the line are the same do not draw
			if (round(this.stortMouseX) != round(mouseX) || round(this.stortMouseY) != round(mouseY)){
				// this part needs some good logic for the case when user chooses no border in other tool
				// what results in noStroke() than comes back to line tool without changing stroke weight
				// and won't be able see the change in code, on the other hand if border is on, we don't want to repat
				// the same stroke command twice so:
				// if IsPenChanged wrote in code stroke(value) then just change IsPenChanged.stroke to true
				// if stroke value hasn't change, but IsPenChanged is false, (that means we are on noStroke at the moment)
				// then change IsPenChanged.stroke to true and push to code stroke weight.
				if(!currentPenSettings.stroke) { // if noStroke is on then
					if(document.getElementById('strokeWeight').value != currentPenSettings.strokeWeight){
						IsPenChanged(); // if strokeWeight was changed that just show that in code
					} else { // otherwise show that stroke is now on to drawe the line
						code.push(`strokeWeight(${currentPenSettings.strokeWeight})`);
					}
					currentPenSettings.stroke = true; // in both cases change stroke to true
				} else {
					IsPenChanged(); // if stroke is true just check if stroke weight or color was changed
				} // isPenChanged function is in helperFunctions.js

				this.codedLine = "line(" + round(this.stortMouseX) + ", " + round(this.stortMouseY) + ", " + round(mouseX) + ", " + round(mouseY) + ");";
				code.push(this.codedLine);
				codeArea();
			}
			loadPixels();
			this.drawing = false;
			this.stortMouseX = -1;
			this.stortMouseY = -1;

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
