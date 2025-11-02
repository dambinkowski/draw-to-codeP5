function SprayCanTool(){

	this.name = "sprayCanTool";
	this.icon = "assets/sprayCan.png";

	this.spraySpread = 10;

	this.x = -1;
	this.y = -1;

	this.draw = function(){
		if(mouseIsPressed && MouseIsOnCanvas()){

			stroke(document.getElementById('strokeColor').value);
			for(var i = 0; i < this.spraySpread * 3/2; i++){ // more spread - draw more points ration 3/2

				this.x = random(mouseX-this.spraySpread, mouseX+this.spraySpread);

				this.y = random(mouseY-this.spraySpread, mouseY+this.spraySpread);

				if(abs(dist(this.x, this.y, mouseX, mouseY)) < this.spraySpread){ // for spray to be cicrle not squares
					point(this.x, this.y);
				}
			}
		}
	};

	this.unselectTool = () => {
		//clear options
		select(".options").html("");
	};

	this.populateOptions = () => {
		strokeWeight(1);
		select(".options").html(
			`<span class='optionsElement'><label for='strokeColor'> Stroke Color: </label><input type='color' id='strokeColor' class='sprayCanColor' value='${currentPenSettings.strokeColor}'></span>` +
			`<span class='optionsElement'><label for='spraySize'> Spray Size: </label><input type='range' id='spraySize' min='1' max='80' value='${this.spraySpread}'></span>`
		);
		select("#spraySize").mouseReleased(() => {
			this.spraySpread = int(document.getElementById('spraySize').value);
			// this int transformation is important : the issue is 
			// random(mouseX - this.spraySpread, mouseX + this.spraySpread)
			// so in javascript 10 - "2" = 8, 10 + "2" = 102, and i was expecting 12, such a hard bug to find
			// so int - stirng = int, but int + string = string....
			// to solve this i did type conversion from string to int

		});

	};

}
