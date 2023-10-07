class UMLClass{
	constructor(){
		this.name = ''
		this.attributes = []
		this.methods = []
		this.inheritances = []
		this.x = 0
		this.y = 0
		this.width = diagramWidth;
		this.height = 0;
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
ctx.font = "16px consolas";
ctx.lineWidth = 1

const diagramWidth = 180
const inlineSpace = 16;
const textOffset = 16

var data = JSON.parse(localStorage.getItem("UMLClassDiagramData"));

if (data == null){
	data = {}
}

dataRefreshed();

function dataRefreshed(){
	classNames = [];
	selectedClass = null;
	document.getElementById("created-classes-list").innerHTML = '';
	for (let className of Object.keys(data)){
		classNames.push(className)
		document.getElementById("class-name-input").value = className
		createItem("class")
	}
	emptyEntries();
	adoptDataChanges()
}

canvas.addEventListener("click", (e)=>{
	if (selectedClass == null){
		let canvasX = canvas.getBoundingClientRect().left;
		let canvasY = canvas.getBoundingClientRect().top;
		mouseX = e.clientX - canvasX;
		mouseY = e.clientY - canvasY;
		if (mouseX > 0 && mouseY > 0 && mouseX < xmax && mouseY < ymax){
			for (let classObj of Object.values(data)){
				if (mouseX > classObj.x && mouseY > classObj.y && mouseX < (classObj.x + classObj.width) && mouseY < (classObj.y + classObj.height)){
					selectedClass = classObj;
					break;
				}
			}
		}
	} else{
		selectedClass = null;
	}
})

canvas.addEventListener("mousemove", (e)=>{
	if (selectedClass != null){
		let canvasX = canvas.getBoundingClientRect().left;
		let canvasY = canvas.getBoundingClientRect().top;
		mouseX = e.clientX - canvasX;
		mouseY = e.clientY - canvasY;
		if (mouseX > 0 && mouseY > 0 && mouseX < xmax && mouseY < ymax){
			selectedClass.x = mouseX - selectedClass.width/2;
			selectedClass.y = mouseY - selectedClass.height/2;
			saveData();
			updateDiagram();
		}
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

function copyJSON(){
	navigator.clipboard.writeText(JSON.stringify(data));
}

function pasteJSON(){
	navigator.clipboard.readText().then(content =>{
		data = JSON.parse(content);
		dataRefreshed();
	});
}

function refreshMenus(){
	let menus = document.querySelectorAll("select");
	for (let menu of menus){
		menu.innerHTML = ''
		for (let className of classNames){
			if (className==undefined){continue}
			menu.innerHTML += `<option>${className}</option>`;
		}
	}
}

function getInputClassName(){
	return document.getElementById("class-name-input").value
}

function getItems(listOfItems){
	let listOfSpans = document.querySelectorAll(`#${listOfItems} > li > span.item`)

	let items = []
	for (let item of listOfSpans){
		items.push(item.textContent)
	}
	return items
}

function createClass(){
	let newClass = new UMLClass();
	let newClassName = getInputClassName()
	
	if ((newClass.name = newClassName) == '' || classNames.indexOf(newClassName) != -1){
		return;
	}
	newClass.attributes = getItems("class-attributes-list")
	newClass.methods = getItems("class-methods-list")
	newClass.inheritances = getItems("class-inheritances-list")
	
	emptyEntries();
	document.getElementById("class-name-input").value = newClassName;

	data[newClassName] = newClass;
	classNames.push(newClassName)
	createItem("class")
	adoptDataChanges()
}

function emptyEntries(){
	["name", "attribute", "method"].forEach(classProperty => document.getElementById(`class-${classProperty}-input`).value = '');
	["attributes", "methods", "inheritances"].forEach(classProperty => document.getElementById(`class-${classProperty}-list`).innerHTML = '');
}

function deleteClass(className){
	let classObj = data[className]

	emptyEntries();

	// FILL
	document.getElementById("class-name-input").value = className
	for (let attribute of classObj.attributes){
		document.getElementById("class-attribute-input").value = attribute;
		createItem("attribute");
	}
	for (let method of classObj.methods){
		document.getElementById("class-method-input").value = method;
		createItem("method");
	}
	for (let inheritance of classObj.inheritances){
		document.getElementById("class-inheritance-menu").value = inheritance;
		createItem("inheritance");
	}
	
	delete data[className];
	delete classNames[classNames.indexOf(className)]
	adoptDataChanges()
}

function createItem(classProperty){
	let inputOfItem = `class-${classProperty}-input`;
	if (classProperty == "inheritance"){
		inputOfItem = `class-${classProperty}-menu`;	
	}

	let listOfItem = `class-${classProperty}s-list`;
	let newItem;
	if (classProperty == "class"){
		inputOfItem = `class-name-input`;
		listOfItem = `created-classes-list`;
	}
	newItem = document.getElementById(inputOfItem).value;
	if (classProperty != "inheritance"){
		document.getElementById(inputOfItem).value = '';
	}
	if(getItems(listOfItem).indexOf(newItem) != -1 || newItem == ''){
		return;
	}
	
	document.getElementById(listOfItem).innerHTML += `
	<li>
		<span class="item">${newItem}</span>
		<button onclick="deleteItem('${newItem}', '${classProperty}')">-</button>
	</li>
	`
}

function deleteItem(targetItem, classProperty){
	let listOfItem = `class-${classProperty}s-list`;
	if (classProperty == "class"){
		listOfItem = "created-classes-list";
		deleteClass(targetItem);
	}
	let inputOfItem = `class-${classProperty}-input`;
	if (classProperty == "inheritance"){
		inputOfItem = `class-${classProperty}-menu`;	
	}
	if (classProperty == "class"){
		inputOfItem = `class-name-input`;
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

function saveData(){
	localStorage.setItem("UMLClassDiagramData", JSON.stringify(data));
}

function adoptDataChanges(){
	saveData();
	refreshMenus()
	updateDiagram()
}

function drawLine(x, y, x2, y2){
	ctx.beginPath()
	ctx.moveTo(x, y)
	ctx.lineTo(x2, y2)
	ctx.stroke()
}

function drawText(text, x, y){
	ctx.fillText(text, x + textOffset, y)
}

function drawParallelLines(x, y){
	drawLine(x, y, x, y - inlineSpace)
	drawLine(x + diagramWidth, y, x + diagramWidth, y - inlineSpace)
}


function drawArrow(x, y){
	ctx.beginPath();
	ctx.arc(x, y, 6, 0, 2*Math.PI)
	ctx.stroke()
}

function updateDiagram(){
	ctx.fillStyle = "#111"
	ctx.fillRect(0, 0, xmax, ymax)
	ctx.fillStyle = "#ddd"
	ctx.strokeStyle = "#ddd"
	for (let classObj of Object.values(data)){
		let classX = classObj.x
		let classY = classObj.y
		let height = classY;
		drawLine(classX, height, classX + diagramWidth, height)
		height += inlineSpace

		drawParallelLines(classX, height)

		drawText(classObj.name, classX + (diagramWidth/2) - ((diagramWidth/12)*(classObj.name.length)/2), height)
		height += inlineSpace

		drawParallelLines(classX, height)

		drawLine(classX, height, classX + diagramWidth, height)
		height += inlineSpace

		drawParallelLines(classX, height)

		for (let attribute of classObj.attributes){
			drawText(attribute, classX, height)
			height += inlineSpace

			drawParallelLines(classX, height)

		}
		drawLine(classX, height, classX + diagramWidth, height)
		height += inlineSpace

		drawParallelLines(classX, height)

		for (let method of classObj.methods){
			drawText(method + "()", classX, height)
			height += inlineSpace

			drawParallelLines(classX, height)

		}
		drawLine(classX, height, classX + diagramWidth, height)

		for (let inheritance of classObj.inheritances){
			if (data[inheritance] != undefined){
				ctx.strokeStyle = "cyan";
				drawLine(classX+diagramWidth/2, classY, data[inheritance].x+diagramWidth/2, data[inheritance].y)
				drawArrow(data[inheritance].x+diagramWidth/2, data[inheritance].y)
				ctx.strokeStyle = "#ddd";
			}
		}
		classObj.height = height - classY;
	}	
}
