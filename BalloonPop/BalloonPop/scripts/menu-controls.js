$(document).ready( function(){
	console.log('Script Started');
	createMainMenu();
	
	$(document).on('click', 'button', function(event){
		event.stopPropagation();
		var id = this.id;
		console.log('CLICKED BUTTON: '+id);
		switch(id){
			case "start":
					startTheGame();
					break;
			case "hscore":
					showHighscores();
					break;
			case "about":
					showAboutInfo();
					break;
			case "exit":
					exitGame();
					break;
			case "backToMain":
					createMainMenu();
					break;
			case "refreshButton":
					createMainMenu();
					break;
			case "gover":
					gameOver();
					break;
			case "closeButton":
					window.close();
					break;
			case "submitName":
					playerName = $('#inputPlayerName').val();
					addPlayerResult();
					createMainMenu();
					break;
			default:
					alert('You broke me, malaka!');
					break;
		}		
	});
})

//global vars
var highscores = [{player: "Test Player 1",
					score: 50},
					{player: "Test Player 2",
					score: 10},
					{player: "Test Player 3",
					score: 30},
					{player: "Test Player 4",
					score: 40},
					{player: "Test Player 5",
					score: 20},
					{player: "Test Player 6",
					score: 5}],
	playerName = "TestPlayer",
	playerScore = 0;
	
function insertBreak(){
	var element = document.createElement("br");
	return element;
}


//Create the Main Menu
function createMainMenu(){
	$('#wrapper').empty();
	console.log(playerName);
	var mainMenu = new Menu();
	var mainMenuButtons = [{name: 'start',
						  value: 'Start The Game'},
						 {name: 'hscore',
						  value: 'Show Highscores'},
						 {name: 'about',
						  value: 'About the game'},
						 {name: 'exit',
						  value: 'Exit The Game'}];
	mainMenu.init('main', 4, mainMenuButtons);
}


//Start Game Logic: 
function startTheGame(playerName){
	$('#wrapper').empty();
	var canvas = document.createElement('canvas');
	canvas.id     = "field";
	canvas.width  = 900;
	canvas.height = 590;	
	$('#wrapper').append(canvas);
	startGame(3);
}


//Create the High-Scores Menu
function showHighscores(){
	$('#wrapper').empty();
	var element = document.createElement("div");	
	element.id = 'hscores';
	$('#wrapper').append(element);
	sortByKey(highscores, 'score');
	for(var i = 0; i < 5; i+=1){
		listHighestScores(i);
		document.getElementById('hscores').appendChild(insertBreak());
	}
	createBackButton('hscores');
}

function listHighestScores(position){
	var element = document.createElement("div");
		text = '#'+ (position+1) + '   Name: ' + highscores[position].player + '   Score: ' + highscores[position].score;
	element.id = 'hscore-' + position;
	element.appendChild(document.createTextNode(text));
	$('#hscores').append(element);	
}

function addPlayerResult(){
	var playerToAdd = {player: playerName,
						score: playerScore};
	highscores.push(playerToAdd);
	return;
}

		//Function to sort highscores[], by given key
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
}


//Function for About-Us
function showAboutInfo() {
	$('#wrapper').empty();
	var element = document.createElement("div"),
		text = teamKiraInfo();
	element.id = 'aboutUs';
	element.appendChild(text);
	$('#wrapper').append(element);
	document.getElementById('aboutUs').appendChild(insertBreak());
	createBackButton('aboutUs');
}

function teamKiraInfo() {
	var element = document.createElement("div"),
		teamMembers = [{name: "Здравко Георгиев", account: "hiksa", responsibility: "Coordinate the team and clean the code of bugs."},
						{name: "Стефан Владков", account: "S.Vladkov", responsibility: "----------"},
						{name: "Ивайло Христов", account: "pl0xicity",  responsibility: "----------"},
						{name: "Цветелина Влашева", account: "Tsvetenceto",  responsibility: "----------"},
						{name: "Крум Тюкенов", account: "Overon",  responsibility: "----------"},
						{name: "Николай Иларионов", account: "nikolay.ilarionov", responsibility: "Create menues, betatesting."}],
		innerElement = document.createElement("ol"),
		openingText = "Team Kira consists of " +teamMembers.length + " members, all active and friendly. We go as follows (listing according to Telerik Student system): ";
		element.appendChild(document.createTextNode(openingText));
		for (var i = 0; i < teamMembers.length; i+=1){
			var listItem = document.createElement("li"),
				listItemText = " " + teamMembers[i].name + " - account: " + teamMembers[i].account + ". Main responsilities included: " + teamMembers[i].responsibility;
				listItem.appendChild(document.createTextNode(listItemText));
			innerElement.appendChild(listItem);
		}
		element.appendChild(innerElement);
		
		return element;
}

// Game Over Menu
function gameOver(){
	$('#wrapper').empty();
	var element = document.createElement("div"),
		text = "Sadly your game has ended!";
		text2 = "Enter your name below.",
		inputBox = document.createElement("input");
	inputBox.id = "inputPlayerName";
	inputBox.placeholder = "Enter your name here";
	element.id = "gameOver";
	element.appendChild(document.createTextNode(text));
	element.appendChild(insertBreak());
	element.appendChild(document.createTextNode(text2));
	element.appendChild(insertBreak());
	element.appendChild(inputBox);
	element.appendChild(insertBreak());
	$('#wrapper').append(element);
	createSubmitButton("gameOver");
}


//Exiting the game logic

function exitGame(){
	$('#wrapper').empty();
	var element = document.createElement("div"),
		innderElement = document.createElement("div"),
		text = "Thank you for playing our game, hope to see you back soon. ",
		refreshButton = document.createElement("button"),
		closeButton = document.createElement("button"),
		extraText = "The button below resets the game, till Exit Game Logic is implemented. ";
	element.id = 'exitGame';
	innderElement.appendChild(document.createTextNode(text));
	refreshButton.id = 'refreshButton';
	refreshButton.textContent = "I dont want to let go!";
	closeButton.id = 'closeButton';
	closeButton.textContent = "Was fun, get me out now";
	element.appendChild(innderElement);
	element.appendChild(refreshButton);
	element.appendChild(insertBreak());
	element.appendChild(closeButton);
	$('#wrapper').append(element);
}


//create specialized Buttons
function createBackButton(id){
	var backButton = new Button(),
		backButtonData = {name: 'backToMain',
							value: 'Return to Main'};
	backButton.addButton(id, backButtonData)
}

function createSubmitButton(id){
	var sbmtButton = new Button(),
		sbmtButtonData = {name: 'submitName',
							value: 'Submit'};
	sbmtButton.addButton(id, sbmtButtonData)
}


//Objects
//Object.Menu
function Menu(){
 this.menuName = "";
 }
 
 Menu.prototype = {
	setName: function(name){
		this.menuName = name;
	},
	getName: function(name){
		return this.menuName;
	},
	init: function(name, buttonsCount, buttonData){
		this.setName(name);
		this.element = document.createElement("div");
		this.element.id = this.menuName;
		$('#wrapper').append(this.element);
		for(var i = 0; i < buttonsCount; i+=1){
			var newButton = new Button();
			newButton.addButton(this.menuName, buttonData[i]);
			document.getElementById(name).appendChild(insertBreak());
		}
	}
 }
 
 //Object.Button
 function Button(){
	this.buttonName = "";
	this.buttonValue ="";
 }
 
 Button.prototype = {
	addButton: function (menu, data){
		this.setName(data.name);
		this.setValue(data.value);
		this.createButton(menu);
	},
	setName: function(name){
		this.buttonName = name;
	},
	setValue: function(name){
		this.buttonValue = name;
	},
	createButton: function(menuID){
		this.element = document.createElement("button");
		this.element.id = this.buttonName;
		this.element.textContent=this.buttonValue;
		$('#'+menuID).append(this.element);	
	}
 }