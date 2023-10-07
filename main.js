class UMLActor{
	constructor(){
		this.name = 'Emad'
		this.usecases = []
		this.x = 0
		this.y = 0
		this.width = labelWidth;
		this.height = blockHeight*6;
	}
}
class UMLCase{
	constructor(){
		this.name = 'function'
		this.inclusions = []
		this.extensions = []
		this.x = labelWidth*1.5 + blockHeight;
		this.y = blockHeight*2
		this.width = labelWidth;
		this.height = blockHeight*2;
	}
}

let clipboardReaderElm = document.getElementById("clipboard-content");
function updateClipboardReader(){
	navigator.clipboard.readText()
	.then(content => {
		clipboardReaderElm.textContent = content;
	})
	.catch(err => {
		clipboardReaderElm.textContent = "Error: " + err;
	})
}

var ctx = canvas.getContext("2d");
const blockHeight = 16;
var defaultCtxColor = "#ddd";
ctx.font = `${blockHeight}px consolas`;
ctx.lineWidth = 1;

const labelWidth = blockHeight*10

var data = JSON.parse(localStorage.getItem("UMLUseCaseDiagramData"));

if (data == null){
	data = {"systemName":"System","actors":[],"cases":[]};
}

dataRefreshed();

function dataRefreshed(){
	actors = data["actors"].filter((obj)=> obj != null);
	cases = data["cases"].filter((obj)=> obj != null);
	selectedDrawing = null;
	document.getElementById("system-name-input").value = data["systemName"];
	document.getElementById("created-actors-list").innerHTML = '';
	document.getElementById("created-cases-list").innerHTML = '';
	for (let actorObj of actors){
		document.getElementById("actor-name-input").value = actorObj.name;
		createItem("actor");
	}
	for (let caseObj of cases){
		document.getElementById("case-name-input").value = caseObj.name;
		createItem("case");
	}
	adoptDataChanges()
}

function emptyEntries(){
	document.getElementById("actor-name-input").value = '';
	document.getElementById("case-name-input").value = '';

	document.getElementById("created-usecases-list").innerHTML = '';
	document.getElementById("created-inclusions-list").innerHTML = '';
	document.getElementById("created-extensions-list").innerHTML = '';
}

function adoptDataChanges(){
	saveData();
	refreshMenus()
	updateDiagram()
}

function saveData(){
	data["actors"] = actors;
	data["cases"] = cases;
	localStorage.setItem("UMLUseCaseDiagramData", JSON.stringify(data));
}

canvas.addEventListener("click", (e)=>{
	if (selectedDrawing == null){
		let canvasX = canvas.getBoundingClientRect().left;
		let canvasY = canvas.getBoundingClientRect().top;
		mouseX = e.clientX - canvasX;
		mouseY = e.clientY - canvasY;
		if (mouseX > 0 && mouseY > 0 && mouseX < xmax && mouseY < ymax){
			let diagramComponents = Object.values(actors).concat(Object.values(cases));
			for (let componentObj of diagramComponents){
				if (mouseX > componentObj.x && mouseY > componentObj.y && mouseX < (componentObj.x + componentObj.width) && mouseY < (componentObj.y + componentObj.height)){
					selectedDrawing = componentObj;
					break;
				}
			}
		}
	} else{
		selectedDrawing = null;
	}
})

canvas.addEventListener("mousemove", (e)=>{
	if (selectedDrawing != null){
		let canvasX = canvas.getBoundingClientRect().left;
		let canvasY = canvas.getBoundingClientRect().top;
		mouseX = e.clientX - canvasX;
		mouseY = e.clientY - canvasY;
		drawingType = 'c';
		if (selectedDrawing instanceof UMLActor){
			drawingType = 'a';
		}
		if (drawingType == 'a'){
			minX = 0;
			maxX = labelWidth;
			minY = 0;
			maxY = ymax;
		} else{
			minX = labelWidth*2 + blockHeight;
			maxX = xmax;
			minY = blockHeight*3;
			maxY = ymax;
		}
		if (mouseX > minX && mouseX < maxX){
			selectedDrawing.x = mouseX - selectedDrawing.width/2;
		}
		if (mouseY > minY && mouseY < maxY){
			selectedDrawing.y = mouseY - selectedDrawing.height/2;
		}
		saveData();
		updateDiagram();
	}
})

document.querySelectorAll("#export-import button").forEach(btn => {
	btn.addEventListener("click", (e)=>{
		e.target.style.backgroundColor = "#999";
		e.target.style.color = "black";
		setTimeout(()=>{
			e.target.style.backgroundColor = '';
			e.target.style.color = '';
		}, 2000);
	})
})

function refreshMenus(){
	let menus = document.querySelectorAll("select");
	for (let menu of menus){
		menu.innerHTML = '';
		for (let caseObj of Object.values(cases)){
			let caseName = caseObj.name;
			menu.innerHTML += `<option>${caseName}</option>`;
		}
	}
}

function copyJSON(){
	navigator.clipboard.writeText(JSON.stringify(data));
}

function pasteJSON(){
	navigator.clipboard.readText().then(content =>{
		data = JSON.parse(content);
		dataRefreshed();
	});
}

function getItems(listOfItems){
	let listOfSpans = document.querySelectorAll(`#${listOfItems} > li > span.item`)

	let items = []
	for (let item of listOfSpans){
		items.push(item.textContent)
	}
	return items
}

function createActor(){
	let newActor = new UMLActor();
	let newActorName = document.getElementById("actor-name-input").value;
	
	if ((newActor.name = newActorName) == '' || getItems("created-actors-list").indexOf(newActorName) != -1){
		return;
	}
	newActor.usecases = getItems("created-usecases-list")
	
	emptyEntries();
	document.getElementById("actor-name-input").value = newActorName;

	data["actors"].push(newActor);
	createItem("actor")
	adoptDataChanges()
}

function deleteActor(actorName){
	for (var actorIndex in data["actors"]){
		if (data["actors"][actorIndex].name == actorName){
			break;
		}
	}

	let actorObj = data["actors"][actorIndex];

	emptyEntries();

	// FILL
	document.getElementById("actor-name-input").value = actorName
	for (let usecase of actorObj.usecases){
		document.getElementById("actor-usecase-menu").value = usecase;
		createItem("usecase");
	}
	
	delete data["actors"][actorIndex];
	adoptDataChanges()
}


function createCase(){
	let newCase = new UMLCase();
	let newCaseName = document.getElementById("case-name-input").value;
	
	if ((newCase.name = newCaseName) == '' || getItems("created-cases-list").indexOf(newCaseName) != -1){
		return;
	}
	newCase.inclusions = getItems("created-inclusions-list")
	newCase.extensions = getItems("created-extensions-list")
	
	emptyEntries();
	document.getElementById("case-name-input").value = newCaseName;

	data["cases"].push(newCase);
	createItem("case")
	adoptDataChanges()
}

function deleteCase(caseName){
	for (var caseIndex in data["cases"]){
		if (data["cases"][caseIndex].name == caseName){
			break;
		}
	}

	let caseObj = data["cases"][caseIndex];

	emptyEntries();

	// FILL
	document.getElementById("case-name-input").value = caseName
	for (let inclusion of caseObj.inclusions){
		document.getElementById("case-inclusion-menu").value = inclusion;
		createItem("inclusion");
	}
	for (let extension of caseObj.extensions){
		document.getElementById("case-extension-menu").value = extension;
		createItem("extension");
	}
	
	delete data["cases"][caseIndex];
	adoptDataChanges()
}

function createItem(caseType){
	let inputOfItem = `${caseType}-name-input`;
	if (["inclusion", "extension"].indexOf(caseType) != -1){
		inputOfItem = `case-${caseType}-menu`;
	} else if (caseType == "usecase"){
		inputOfItem = "actor-usecase-menu";
	}

	let listOfItem = `created-${caseType}s-list`;
	let newItem;
	newItem = document.getElementById(inputOfItem).value;
	if (["usecase", "inclusion", "extension"].indexOf(caseType) == -1){
		document.getElementById(inputOfItem).value = '';
	}
	let items;
	if (["inclusion", "extension"].indexOf(caseType) != -1){
		items = getItems("created-inclusions-list").concat(getItems("created-extensions-list"));
	} else{
		items = getItems(listOfItem);
	}
	if(items.indexOf(newItem) != -1 || newItem == ''){
		return;
	}
	
	document.getElementById(listOfItem).innerHTML += `
	<li>
		<span class="item">${newItem}</span>
		<button onclick="deleteItem('${newItem}', '${caseType}')">-</button>
	</li>
	`
}

function deleteItem(targetItem, caseType){
	let listOfItem = `created-${caseType}s-list`;
	let inputOfItem = `${caseType}-name-input`;
	if (["inclusion", "extension"].indexOf(caseType) != -1){
		inputOfItem = `case-${caseType}-menu`;
	} else if (caseType == "usecase"){
		inputOfItem = "actor-usecase-menu";
	}

	if (caseType == "actor"){
		deleteActor(targetItem);
	}
	if (caseType == "case"){
		deleteCase(targetItem);
	}

	document.getElementById(inputOfItem).value = targetItem
	let parent = document.getElementById(listOfItem);
	for (let child of parent.children){
		if (child.children[0].textContent == targetItem){
			parent.removeChild(child);
			return;
		}
	}
}

function drawActor(x, y, name){
	drawHead(x, y);
	drawLimbs(x, y + blockHeight);
	drawLine(x + (labelWidth/2), y + blockHeight, x + (labelWidth/2), y + blockHeight*2);
	drawLimbs(x, y + blockHeight*2);
	drawText(name, x, y + blockHeight*3);
}

function drawHead(x, y){
	ctx.beginPath();
	ctx.arc(x + (labelWidth/2), y + (blockHeight/2), blockHeight/2, 0, 2*Math.PI)
	ctx.stroke()
}

function drawLimbs(x, y){
	drawLine(x + (labelWidth/2), y, x + (labelWidth/2) + blockHeight, y + blockHeight);
	drawLine(x + (labelWidth/2), y, x + (labelWidth/2) - blockHeight, y + blockHeight);
}

function drawLine(x, y, x2, y2){
	ctx.beginPath()
	ctx.moveTo(x, y)
	ctx.lineTo(x2, y2)
	ctx.stroke()
}

function drawText(text, x, y){
	ctx.fillText(text, x + (labelWidth/2) - ( (blockHeight/2) * (text.length/2) ), y + blockHeight*1.25);
}

function drawCase(x, y, name){
	drawLine(x, y, x + labelWidth, y)
	drawText(name, x, y);
	drawLine(x, y + blockHeight*2, x + labelWidth, y + blockHeight*2)
	drawRadius(x, y);
}

function drawRadius(x, y){
	ctx.beginPath();
	ctx.arc(x, y + blockHeight, blockHeight, Math.PI*0.5, Math.PI*1.5);
	ctx.stroke()
	ctx.beginPath();
	ctx.arc(x + labelWidth, y + blockHeight, blockHeight, -Math.PI*0.5, -Math.PI*1.5)
	ctx.stroke()
}

function drawUseCaseLine(x, y, x2, y2){
	ctx.strokeStyle = "lightgreen";
	drawLine(x + (labelWidth/2), y, x2 + (labelWidth/2), y2);
	ctx.beginPath();
	ctx.arc(x2 + (labelWidth/2), y2, 16, 0, 2*Math.PI);
	ctx.stroke();
	ctx.strokeStyle = defaultCtxColor;
}

function drawInclusionLine(x, y, x2, y2){
	ctx.strokeStyle = "red";
	drawLine(x + (labelWidth/2), y, x2 + (labelWidth/2), y2);
	ctx.beginPath();
	ctx.arc(x2 + (labelWidth/2), y2, 5, 0, 2*Math.PI);
	ctx.arc(x2 + (labelWidth/2), y2, 6, 0, 2*Math.PI);
	ctx.arc(x2 + (labelWidth/2), y2, 7, 0, 2*Math.PI);
	ctx.arc(x2 + (labelWidth/2), y2, 8, 0, 2*Math.PI);
	ctx.stroke();
	ctx.strokeStyle = defaultCtxColor;
}

function drawExtensionLine(x, y, x2, y2){
	ctx.strokeStyle = "cyan";
	drawLine(x + (labelWidth/2), y, x2 + (labelWidth/2), y2);
	ctx.beginPath();
	ctx.arc(x2 + (labelWidth/2), y2, 12, 0, 2*Math.PI);
	ctx.stroke();
	ctx.strokeStyle = defaultCtxColor;
}

function updateDiagram(){
	ctx.fillStyle = "#111"
	ctx.fillRect(0, 0, xmax, ymax)
	ctx.fillStyle = defaultCtxColor;
	ctx.strokeStyle = defaultCtxColor;
	// system box
	drawLine(labelWidth*1.5, blockHeight*2, xmax, blockHeight*2);
	drawText(data["systemName"], labelWidth + (xmax - labelWidth*1.5)/2, 0)
	drawLine(labelWidth*1.5, 0, labelWidth*1.5, ymax);
	for (let actorObj of Object.values(actors)){
		let aX = actorObj.x;
		let aY = actorObj.y;
		drawActor(aX, aY, actorObj.name)
		for (let actorCase of actorObj.usecases){
			for (let caseObj of Object.values(cases)){
				if (caseObj.name == actorCase){
					drawUseCaseLine(aX, aY, caseObj.x, caseObj.y)
					break;
				}
			}
		}
	}
	for (let caseObj of Object.values(cases)){
		let cX = caseObj.x
		let cY = caseObj.y
		drawCase(cX, cY, caseObj.name)
		for (let inclusion of caseObj.inclusions){
			for (let caseObj of Object.values(cases)){
				if (caseObj.name == inclusion){
					drawInclusionLine(cX, cY, caseObj.x, caseObj.y)
					break;
				}
			}
		}
		for (let extension of caseObj.extensions){
			for (let caseObj of Object.values(cases)){
				if (caseObj.name == extension){
					drawExtensionLine(cX, cY, caseObj.x, caseObj.y)
					break;
				}
			}
		}
	}
}

function renameSystem(){
	let newName = document.getElementById("system-name-input").value;
	if (newName != ''){
		data["systemName"] = newName;
		updateDiagram();
		saveData();
	}
}
