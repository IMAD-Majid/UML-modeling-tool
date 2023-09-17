class UMLClass{
	constructor(){
		this.name = ''
		this.attributes = []
		this.methods = []
		this.inheritances = []
		this.x = 0
		this.y = 0
	}
}

var ctx = canvas.getContext("2d");
ctx.font = "16px consolas";
ctx.lineWidth = 2

const diagramWidth = 180
const inlineSpace = 16;
const textOffset = 16

var data = JSON.parse(localStorage.getItem("UMLClassDiagramData"));

if (data == null){
	data = {}
}

var classNames = [];

for (let className of Object.keys(data)){
	classNames.push(className)
	document.getElementById("class-name-input").value = className
	createItem("class")
}

adoptDataChanges()


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
	
	data[newClassName] = newClass;
	classNames.push(newClassName)
	createItem("class")
	adoptDataChanges()
}

function deleteClass(className){
	let classObj = data[className]

	// EMPTY
	document.querySelectorAll("input[type=text]").forEach(elem => elem.value = '');
	["attributes", "methods", "inheritances"].forEach(classProperty => document.getElementById(`class-${classProperty}-list`).innerHTML = '');

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
		newItem = getInputClassName()
		listOfItem = `created-classes-list`;
	} else{
		newItem = document.getElementById(inputOfItem).value
	}
	
	if(getItems(listOfItem).indexOf(newItem) != -1 || newItem == ''){
		return
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
	if (classProperty != "class"){
		document.getElementById(inputOfItem).value = targetItem
	}
	let parent = document.getElementById(listOfItem);
	for (let child of parent.children){
		if (child.children[0].textContent == targetItem){
			parent.removeChild(child);
			return;
		}
	}
}

function adoptDataChanges(){
	localStorage.setItem("UMLClassDiagramData", JSON.stringify(data));
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
	ctx.arc(x, y, 8, 0, 2*Math.PI)
	ctx.stroke()
}

function updateDiagram(){
	ctx.fillStyle = "black"
	ctx.fillRect(0, 0, xmax, ymax)
	ctx.fillStyle = "white"
	ctx.strokeStyle = "white"
	console.log(data)
	for (let classObj of Object.values(data)){
		console.log(classObj)
		let classx = classObj.x
		let classy = classObj.y
		let height = classy;
		drawLine(classx, height, classx + diagramWidth, height)
		height += inlineSpace

		drawParallelLines(classx, height)

		drawText(classObj.name, classx + ((diagramWidth/12)*(classObj.name.length)/2), height)
		height += inlineSpace

		drawParallelLines(classx, height)

		drawLine(classx, height, classx + diagramWidth, height)
		height += inlineSpace

		drawParallelLines(classx, height)

		for (let attribute of classObj.attributes){
			drawText(attribute, classx, height)
			height += inlineSpace

			drawParallelLines(classx, height)

		}
		drawLine(classx, height, classx + diagramWidth, height)
		height += inlineSpace

		drawParallelLines(classx, height)

		for (let method of classObj.methods){
			drawText(method + "()", classx, height)
			height += inlineSpace

			drawParallelLines(classx, height)

		}
		drawLine(classx, height, classx + diagramWidth, height)
		height += inlineSpace

		drawParallelLines(classx, height)

		for (let inheritance of classObj.inheritances){
			ctx.strokeStyle = "cyan";
			ctx.lineWidth = 4
			drawLine(classx+diagramWidth/2, classy, data[inheritance].x+diagramWidth/2, data[inheritance].y)
			drawArrow(data[inheritance].x+diagramWidth/2, data[inheritance].y)
			ctx.strokeStyle = "white";
			ctx.lineWidth = 2
			
			drawText(inheritance, classx, height)
			height += inlineSpace

			drawParallelLines(classx, height)

		}
		drawLine(classx, height, classx + diagramWidth, height)

		drawParallelLines(classx, height)

	}	
}
