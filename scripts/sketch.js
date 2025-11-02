//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;
var code = []; // will store the code that will be displayed on the right side
// used to make code part look well & readable if any of those proparties are changed
const currentPenSettings = {
	stroke: true,
	strokeWeight: 3,
	strokeColor: '#000000',
	fill: true,
	fillColor: '#fec700'
}


function setup() {

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");

	//create helper functions and the colour palette
	helpers = new HelperFunctions();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new RectangleTool());
  toolbox.addTool(new EllipseTool());
	toolbox.addTool(new VertexTool());
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new SprayCanTool());
	toolbox.addTool(new mirrorDrawTool());
	toolbox.addTool(new StampTool());
	background(255);

	code.push(`strokeWeight(${currentPenSettings.strokeWeight});`);
	code.push(`stroke('${currentPenSettings.strokeColor}');`);
	code.push(`fill('${currentPenSettings.fillColor}');`);
	codeArea();

}

function draw() {
	// this little left corner to see x and y coordinates usefull when drawing
	if(MouseIsOnCanvas()) {
		select("#leftFooter").html(
			`x: ` + round(mouseX) + `<br>` + `y: ` + round(mouseY) + ``
		);
	} else {
		select("#leftFooter").html('not on<br>canvas');
	}
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	toolbox.selectedTool.hasOwnProperty("draw") ? toolbox.selectedTool.draw() : alert("it doesn't look like your tool has a draw method!");
}
