function StampTool(){
	this.icon = "assets/stamp.png";
	this.name = "stamp";
	this.imgSize = 8;
	this.imgNumber = 2;
	this.imgSpread = 10;
	var star = loadImage("assets/stamp.png");

	this.draw = function(){
		if(mouseIsPressed && MouseIsOnCanvas()) {
			this.x = mouseX - int(star.width * document.getElementById('imgSize').value / 100) / 2; // for image to be in the middle of mouse click
			this.y = mouseY - int(star.height * document.getElementById('imgSize').value / 100)/ 2;
			this.imgSpread = int(document.getElementById('imgSpread').value) // spread of the img
			for(var i = 0; i < int(document.getElementById('imgNumber').value); i++){
				image(
					star,
					random(this.x - this.imgSpread, this.x + this.imgSpread),
					random(this.y - this.imgSpread, this.y + this.imgSpread),
					int(star.width * document.getElementById('imgSize').value / 100), // resizing based on img size
					int(star.height * document.getElementById('imgSize').value / 100)
				);
			}
		}
	}
	this.unselectTool = function() {
		//clear options
		select(".options").html("");
	};
	// adds slider in options area
	this.populateOptions = function() {
		select(".options").html(
			`<span class='optionsElement'><label for='imgSize'> Stamp Size: </label><input type='range' id='imgSize' class='imgSizeStar' min='1' max='30' value='${this.imgSize}'></span>` +
			`<span class='optionsElement'><label for='imgNumber'> Stamp Numebr </label><input type='range' id='imgNumber' min='1' max='3' value='${this.imgNumber}'></span>` +
			`<span class='optionsElement'><label for='imgSpread'> Stamp Spread </label><input type='range' id='imgSpread' min='0' max='50' value='${this.imgSpread}'></span>`
		);
	}
}
