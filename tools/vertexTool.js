function VertexTool(){
	this.icon = "assets/vertex.png";
	this.name = "Vertex";

	this.isFill = true;
	this.isBorder = true;
	this.currentShape = [];
	this.editMode = false;
	this.endMouseX = -1;
	this.endMouseY = -1;
	this.drawing = false;



	this.draw = function(){
		updatePixels();

		if (mouseIsPressed && MouseIsOnCanvas()){
			if(this.editMode) {
				for (var i = 0; i < this.currentShape.length; i++){
					if ( dist(this.currentShape[i].x, this.currentShape[i].y,mouseX,mouseY) < 15){
						this.currentShape[i].x = mouseX;
						this.currentShape[i].y = mouseY;
					}
				}
			} else {
				this.endMouseX = mouseX;
				this.endMouseY = mouseY;
				this.drawing = true;
			}
		} else if (this.drawing){
			this.currentShape.push({
				x: this.endMouseX,
				y: this.endMouseY
			});
			this.drawing = false;
		}

			if (this.isBorder) {
				stroke(document.getElementById('borderColor').value);
				strokeWeight(document.getElementById('borderWeight').value);
			} else {
				 noStroke();
			};
			this.isFill ? fill(document.getElementById('fillColor').value) : noFill();




			beginShape();
			for(var i = 0; i < this.currentShape.length; i++){
				vertex(this.currentShape[i].x, this.currentShape[i].y);
			}
			endShape();

	};

	this.unselectTool = function() {
		loadPixels();
		updatePixels();
		//clear options
		select(".options").html("");
	};

	this.populateOptions = function() {
		// if tool is choosen add those options in options area specific for that tool
		select(".options").html(
			"<button id='noBorder' class='optionsButton'>No Border</button>" +
			`<span class='optionsElement'><label id='labelBorderWeight' for='borderWeight'>Border Weight: </label><input type='number' id='borderWeight' value='${currentPenSettings.strokeWeight}'></span>` +
			`<span class='optionsElement'><label id='labelBorderColor' for='borderColor'> Border Color: </label><input type='color' id='borderColor' value='${currentPenSettings.strokeColor}'></span>` +
			// fill options
			"<button id='noFill' class='optionsButton'>No Fill</button>" +
			`<span class='optionsElement'><label id='labelFillColor' for='fillColor'>Fill Color: </label><input type='color' id='fillColor' value='${currentPenSettings.fillColor}'></span>` +
			// edit and  finish options
			"<button id='editButton' class='optionsButton'>Edit Shape</button>" +
			"<button id='finishShapeButton' class='optionsButton'>Finish Shape</button>"
		);

		if (!this.isBorder) { // no reason to display border options if no border was chosen
			this.isBorder = false;
			select("#noBorder").html("Add border");
			document.getElementById("labelBorderWeight").hidden = true;
			document.getElementById("borderWeight").hidden = true;
			document.getElementById("labelBorderColor").hidden = true;
			document.getElementById("borderColor").hidden = true;
		} else { // otherwise display border options
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
		select("#editButton").mouseClicked(() => {
			if(this.editMode){
				this.editMode = false;
				select("#editButton").html("Edit Shape")
			} else {
				this.editMode = true;
				select("#editButton").html("Finish edit");
			}
		});
		// when finish shape is pressed put it to code and area, and load pixels, clear the current shape array 
		select("#finishShapeButton").mouseClicked(() => {
			IsPenChanged(this.isBorder, this.isFill);
			code.push("beginShape();");
			for(var i = 0; i < this.currentShape.length; i++){
				code.push("  vertex(" + round(this.currentShape[i].x) + "," + round(this.currentShape[i].y) + ");");
			}
			code.push("endShape();");
			codeArea();
			loadPixels();
			this.currentShape = [];
			if(this.editMode) {
				this.editMode = false;
				select("#editButton").html("Edit Shape");
			}
			this.currentShape = [];
		});

	};

}
