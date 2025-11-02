// this file stores usefull functions that are used through out the program

function HelperFunctions() {
	//Jquery click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object
	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
		// preventing bug that clear button does not clear the vertex tool
		if (document.getElementById('finishShapeButton') != null){
			document.getElementById('finishShapeButton').click();
		}
		// clear the screen
		background(255, 255, 255);
		// reset the pen setting
		currentPenSettings.stroke = true;
		currentPenSettings.strokeWeight = 3;
		currentPenSettings.strokeColor = '#000000';
		currentPenSettings.fill = true;
		currentPenSettings.fillColor = '#fec700';
		//call loadPixels to update the drawing state
		loadPixels();
		// clear the code area
		code = [];
		code.push(`strokeWeight(${currentPenSettings.strokeWeight});`);
		code.push(`stroke('${currentPenSettings.strokeColor}');`);
		code.push(`fill('${currentPenSettings.fillColor}');`);
		codeArea();

	});
	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
		saveCanvas("myPicture", "jpg");
	});

	// save code area to clipboard
	select("#saveToClipboardButton").mouseClicked(function() {
		var codeString = "";
		for (var i = 0; i < code.length; i++) {
	    codeString = codeString +  `
` + code[i]; // if this indentation is fixed, there will be a bug that the pasted code has alot of indentation
						// this indentation supposed to be easy to paste
				// there is a new line and tab indentation between every line of code
	  }
		// adapted function from stack overflow, and created stirng that will fit well to that function
		// reference is above function
		textToClipboard(codeString);
	});

	// save code as txt file
	select("#saveTextFileButton").mouseClicked(function() {
		saveStrings(code, "code from drawing.txt");
	});
}

// https://stackoverflow.com/questions/33855641/copy-output-of-a-javascript-variable-to-the-clipboard
// author: Peter Paulovics
// date: answered Jan 31, 2018 at 12:31
// stack overflow
function textToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function MouseIsOnCanvas() {
	// this function is wildly use for most of the tools to ensure that clicks of
	// the mose are with in the canvas returns true if mouse in on canvas
	// otherwise returns fall
	 if (mouseX >= 0 && mouseX <= canvasContainer.size().width &&
		mouseY >= 0 && mouseY <= canvasContainer.size().height){
			return true;
		} else {
			return false;
		}
}

function IsPenChanged(isBorder, isFill) {
	// is pen changed ? if it is then ajust code area to reflect that
	// this function will check if the pen was changed (meaning fill color, or stroke),
	//if it was it will add that change to the code part before the 2D shape code

	//stroke weight line tool
	if (document.getElementById('strokeWeight') != null){
		if (document.getElementById('strokeWeight').value != currentPenSettings.strokeWeight){
			currentPenSettings.strokeWeight = document.getElementById('strokeWeight').value;
			code.push(`strokeWeight(${currentPenSettings.strokeWeight});`);
		}
	}
	// stroke color line tool
	if(document.getElementById('strokeColor') != null){
		if(document.getElementById('strokeColor').value != currentPenSettings.strokeColor){
			currentPenSettings.strokeColor = document.getElementById('strokeColor').value;
			code.push(`stroke('${currentPenSettings.strokeColor}');`);
		}
	}

	// other tools
	// avoiding repetition depending if border was chosen or not
	if(isBorder && !currentPenSettings.stroke && (typeof isBorder !== 'undefined')){
		if(document.getElementById('borderWeight').value != currentPenSettings.strokeWeight ||
			 document.getElementById('borderColor').value != currentPenSettings.strokeColor) {
			if(document.getElementById('borderWeight').value != currentPenSettings.strokeWeight){
		 		currentPenSettings.strokeWeight = document.getElementById('borderWeight').value;
		 		code.push(`strokeWeight(${currentPenSettings.strokeWeight});`);
		 	} else {
				currentPenSettings.strokeColor = document.getElementById('borderColor').value;
				code.push(`stroke('${currentPenSettings.strokeColor}');`);
			}
		} else { // there is no commend storkeOn so to turn it on either need to specife stroke color or stroke weight...
			code.push(`strokeWeight(${currentPenSettings.strokeWeight});`);
		}
		currentPenSettings.stroke = true;
	} else if (isBorder && currentPenSettings.stroke && (typeof isBorder !== 'undefined')){
		if(document.getElementById('borderWeight').value != currentPenSettings.strokeWeight){
			currentPenSettings.strokeWeight = document.getElementById('borderWeight').value;
			code.push(`strokeWeight(${currentPenSettings.strokeWeight});`);
		}
		if(document.getElementById('borderColor').value != currentPenSettings.strokeColor){
			currentPenSettings.strokeColor = document.getElementById('borderColor').value;
			code.push(`stroke('${currentPenSettings.strokeColor}');`);
		}
	} else if (!isBorder && currentPenSettings.stroke && (typeof isBorder !== 'undefined')) {
		currentPenSettings.stroke = false;
		code.push(`noStroke();`);
	}
	// fill or no fill if is just got turned
	if(isFill && !currentPenSettings.fill && (typeof isFill !== 'undefined')){
		currentPenSettings.fillColor = document.getElementById('fillColor').value;
		currentPenSettings.fill = true;
		code.push(`fill('${currentPenSettings.fillColor}');`);
	} else if (isFill && currentPenSettings.fill && (typeof isFill !== 'undefined')){
		if(document.getElementById('fillColor').value != currentPenSettings.fillColor) {
			currentPenSettings.fillColor = document.getElementById('fillColor').value;
			code.push(`fill('${currentPenSettings.fillColor}');`);
		} // only write fill if the fill color changed
	} else if (!isFill && currentPenSettings.fill && (typeof isFill !== 'undefined')) {
		currentPenSettings.fill = false;
		code.push(`noFill();`);
	}
}
