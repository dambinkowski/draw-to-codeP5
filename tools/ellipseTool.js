function EllipseTool(){
	this.icon = "assets/ellipse.png";
	this.name = "Ellipse";

	this.startMouseX = -1;
	this.startMouseY = -1;
	this.drawing = false;

	this.isFill = true;
  this.isBorder = true;
	this.codedLine = "";

	this.draw = function(){
		if (mouseIsPressed && MouseIsOnCanvas()){
			if (this.startMouseX == -1){
				this.startMouseX = mouseX;
				this.startMouseY = mouseY;
				this.drawing = true;
				loadPixels();
			} else {
				updatePixels();
				if (this.isBorder) {
					stroke(document.getElementById('borderColor').value);
					strokeWeight(document.getElementById('borderWeight').value);
				} else {
					 noStroke();// from studying freecodecamp
				}
				this.isFill ? fill(document.getElementById('fillColor').value) : noFill();
				ellipse(
					round(abs(this.startMouseX - mouseX) / 2 + min(this.startMouseX, mouseX)),
					round(abs(this.startMouseY - mouseY) / 2 + min(this.startMouseY, mouseY)),
					round(abs(mouseX - this.startMouseX)),
					round(abs(mouseY - this.startMouseY))
				);
			}
		} else if(this.drawing){
			if (round(this.startMouseX) != round(mouseX) || round(this.startMouseY) != round(mouseY)){
				IsPenChanged(this.isBorder, this.isFill);
				this.codedLine = "ellipse(" +
					round(abs(this.startMouseX - mouseX) / 2 + min(this.startMouseX, mouseX)) + ", " +
					round(abs(this.startMouseY - mouseY) / 2 + min(this.startMouseY, mouseY)) + ", " +
					round(abs(mouseX - this.startMouseX)) + ", " +
					round(abs(mouseY - this.startMouseY)) + ");";
				code.push(this.codedLine);
				codeArea();
			}

			this.drawing = false;
			this.startMouseX = -1;
			this.startMouseY = -1;
			loadPixels();
		}
	};
	this.unselectTool = () => {
		updatePixels();
		//clear options
		select(".options").html("");
	};
	// options i need
	// fill color, no fill, stroke weight, stroke color, no stroke,
	this.populateOptions = () => {
		// if tool is choosen add those options in options area specific for that tool
		select(".options").html(
			// border options
			"<button id='noBorder' class='optionsButton'>No Border</button>" +
			`<span class='optionsElement'><label id='labelBorderWeight' for='borderWeight'>Border Weight: </label><input type='number' id='borderWeight' value='${currentPenSettings.strokeWeight}'></span>` +
			`<span class='optionsElement'><label id='labelBorderColor' for='borderColor'> Border Color: </label><input type='color' id='borderColor' value='${currentPenSettings.strokeColor}'></span>` +
			// fill options
			"<button id='noFill' class='optionsButton'>No Fill</button>" +
			`<span class='optionsElement'><label id='labelFillColor' for='fillColor'>Fill Color: </label><input type='color' id='fillColor' value='${currentPenSettings.fillColor}'></span>`
		);
		// if user comes back to the tool lets bring back the options setting used
		if (!this.isBorder) { // no reason to display border options if no border was chosen
			this.isBorder = false;
			select("#noBorder").html("Add border");
			document.getElementById("labelBorderWeight").hidden = true;
			document.getElementById("borderWeight").hidden = true;
			document.getElementById("labelBorderColor").hidden = true;
			document.getElementById("borderColor").hidden = true;
		} else {
			this.isBorder = true;
			select("#noBorder").html("No border");
			document.getElementById("labelBorderWeight").hidden = false;
			document.getElementById("borderWeight").hidden = false;
			document.getElementById("labelBorderColor").hidden = false;
			document.getElementById("borderColor").hidden = false;
		}
		if (!this.isFill) { // no reason to display fill options if no fill was chosen
			this.isFill = false;
			select("#noFill").html("Add fill");
			document.getElementById("labelFillColor").hidden = true;
			document.getElementById("fillColor").hidden = true;
		} else {
			this.isFill = true;
			select("#noFill").html("No fill");
			document.getElementById("labelFillColor").hidden = false;
			document.getElementById("fillColor").hidden = false;
		}



		// 	//click handler
		select("#noBorder").mouseClicked(() => {
			if (this.isBorder) {
				this.isBorder = false;
				select("#noBorder").html("Add border");
				document.getElementById("labelBorderWeight").hidden = true; // select does not work I was trying
				document.getElementById("borderWeight").hidden = true;
				document.getElementById("labelBorderColor").hidden = true;
				document.getElementById("borderColor").hidden = true;
			} else {
				this.isBorder = true;
				select("#noBorder").html("No border");
				document.getElementById("labelBorderWeight").hidden = false;
				document.getElementById("borderWeight").hidden = false;
				document.getElementById("labelBorderColor").hidden = false;
				document.getElementById("borderColor").hidden = false;
			}
		});
		select("#noFill").mouseClicked(() => {
			if (this.isFill) {
				this.isFill = false;
				select("#noFill").html("Add fill");
				document.getElementById("labelFillColor").hidden = true;
				document.getElementById("fillColor").hidden = true;
			} else {
				this.isFill = true;
				select("#noFill").html("No fill");
				document.getElementById("labelFillColor").hidden = false;
				document.getElementById("fillColor").hidden = false;
			}
		});
	};


}
