class User{
	constructor(email, password, role="internaut"){
		this.email = email;
		this.password = password;
		this.role = role;
	}
}

class Knight{
	constructor(NIC, email,  name, fname, birthDate, ismale=true){
		this.NIC = NIC;
		this.email = email;
		this.name = name;
		this.fname = fname;
		this.birthDate = birthDate;
		this.ismale = ismale;
	}
}

class Horse{
	constructor(race, age){
		this.horseId = getHorseId(); // counter, in the local storage
		this.race = race;
		this.age = age;
	}
}

class Troop{
	constructor(name, region){
		this.name = name;
		this.region = region;
		this.knights = [];
		this.horses = [];
	}
}

class Plan{
	constructor(day, knightsEmail, horsesId){
		this.day = day;
		this.knightsEmail = knightsEmail;
		this.horsesId = horsesId;
	}
}


var regions = localStorage.getItem("regions")
if (regions == undefined){
	regions = [];
} else{
	regions = JSON.parse(regions);
}
console.log(regions)

var races = localStorage.getItem("races")
if (races == undefined){
	races = [];
} else{
	races = JSON.parse(races);
}

//localStorage.removeItem("users");
var users = localStorage.getItem("users")
if (users == undefined){
	users = [new User("root", '', "Admin")];
} else{
	users = JSON.parse(users);
}
console.log(users)

var knights = localStorage.getItem("knights")
if (knights == undefined){
	knights = [];
} else{
	knights = JSON.parse(knights);
}

var horses = localStorage.getItem("horses")
if (horses == undefined){
	horses = [];
} else{
	horses = JSON.parse(horses);
}

var troops = localStorage.getItem("troops")
if (troops == undefined){
	troops = [];
} else{
	troops = JSON.parse(troops);
}

var plans = localStorage.getItem("plans")
if (plans == undefined){
	plans = [];
} else{
	plans = JSON.parse(plans);
}


var horseCounter = localStorage.getItem("horseCounter")
if (horseCounter == undefined){
	horseCounter = 0;
} else{
	horseCounter = horseCounter;
}

function getHorseId(){
	horseCounter++;
	localStorage.setItem("horseCounter", horseCounter);
	return horseCounter;
}

function saveDataRegions(){
	regions = regions.filter((item)=> item !== null && item !== undefined);
	localStorage.setItem("regions", JSON.stringify(regions));
}

function saveDataRaces(){
	races = races.filter((item)=> item !== null && item !== undefined);
	localStorage.setItem("races", JSON.stringify(races));
}

function saveDataUsers(){
	localStorage.setItem("users", JSON.stringify(users));
}

function saveDataKnights(){
	localStorage.setItem("knights", JSON.stringify(knights));
}

function saveDataHorses(){
	localStorage.setItem("horses", JSON.stringify(horses));
}

function saveDataTroops(){
	localStorage.setItem("troops", JSON.stringify(troops));
}

function saveDataPlans(){
	localStorage.setItem("plans", JSON.stringify(plans));
}

