var lives = 1;
var wins = 0;
var losses = 0;
var i = 0;
var newLost = 0;

var words = ["jquery", "python", "html", "javascript", "camelcase", "css", "mysql", "mongodb", "react"];
// var randomValue = getWord();
var theWord = "";
var lettersChosen = [];
var correctLetter = 0;
var audio = new Audio('assets/sound/theSound.mp3');
var e = new KeyboardEvent('keydown',{'keyCode':32,'which':32});

function pauseCurrentAudio() {
	audio.pause();
}

function playAudio() {
	audio.play();
}

function getWord() {
	var randomValue = (Math.floor(Math.random() * words.length));
	theWord = words[randomValue];
	correctLetter = 0;
	return theWord;
}

var fourLetters = document.getElementById("current-word");

function addLetterToArray(x){
	if(globalKeyCodeStroke !== 32){
	lettersChosen.push(globalKeyStroke);
	document.getElementById("letters-guessed").innerHTML = lettersChosen.toString();
	}else if(globalKeyCodeStroke === 32 || x === "reset"){
		document.getElementById("letters-guessed").innerHTML = lettersChosen.toString();
	}
}

function weHaveAWinner(){
	wins++;
	document.getElementById("wins").innerHTML = wins;
	newGame();
}

function weHaveALoser(){
	losses++;
	document.getElementById("losses").innerHTML = losses;
	newLost = 1;
	document.getElementById("restartGame").style.display = inline;
	return false;
}

function setLives(x){
	lives = x;
	document.getElementById("lives").innerHTML = lives;
}

function loseLife(){
	console.log("Lose a life!");
	lives--;
	document.getElementById("lives").innerHTML = lives;
}

function updateGetElement(x, y){
	console.log("Inside updateGetElement! " + x);
	var correctedValue = x + 1;
	var letterChange = document.getElementById(correctedValue);
	letterChange.innerHTML = y;
}

function clearDivs() {
	for(var i = 0; i< 10; i++){
		updateGetElement(i, "");
	}
}

function resetDivs() {
	for(var i = 0; i < theWord.length; i++){
		updateGetElement(i, "-");
	}
}

function checkIfInWord() {
	// if(theWord.indexOf(globalKeyStroke) >= 0){

	// }
	
		// needs to check each letter and then update each section as needed
		if(theWord.indexOf(globalKeyStroke) >= 0){
			for(var i = 0; i < theWord.length; i++){
				if(theWord[i].indexOf(globalKeyStroke) >= 0) {
				// console.log("In the If of the for in CheckIfInArray");
				updateGetElement(i, globalKeyStroke);
				pauseCurrentAudio();
				playAudio();
				correctLetter++; // This counts to correct number of letters to trigger winner!
				addLetterToArray();
				if(correctLetter >= theWord.length){
					weHaveAWinner();
				}}}
			// console.log("Correct Letter Counter: " + correctLetter);
		}
		else{
			if(correctLetter < theWord.length){
					loseLife();
					addLetterToArray();
				}
		}
}

function checkIfInArray(){
	for(var i = 0; i < lettersChosen.length + 1; i++){
		if(lettersChosen.indexOf(globalKeyStroke) === -1){
			// console.log("In checkIfInArray and the letter has not been chosen before.");
			checkIfInWord();
			return true;
		}
	}
}

function weLost(){
	if(lives <= 1){
		// console.log("In the weLost Function!");
		newGame();
		return true;
	}
}

function newGame() {
  document.dispatchEvent(e);
  getWord();
  setLives(10);
  newLost = 0;
  playAudio();
  addLetterToArray("reset");
  lettersChosen.length = 0; //clears array
  
  // console.log("The Lives are: " + lives);
  // chooseWord();
  clearDivs();
  resetDivs();
}


document.onkeyup = function(event) {
globalKeyStroke = event.key.toLowerCase();
globalKeyCodeStroke = event.keyCode;
if(event.keyCode === 32){
   newGame();
}else{
	//check if letter input is in word or in array
	if(lives > 1){
	// console.log("Key Stroke is: " + globalKeyStroke);
	checkIfInArray();
	}else if(weLost() && newLost === 0){
		checkIfInArray();
		weHaveALoser();
	}
}
};


// function chooseWord(){

// }

	//This probably could have been done with a for loop.. (will try later)
	// var letter1 = document.getElementById(1);
	// var letter2 = document.getElementById(2);
	// var letter3 = document.getElementById(3);
	// var letter4 = document.getElementById(4);
	// var letter5 = document.getElementById(5);
	// var letter6 = document.getElementById(6);
	// var letter7 = document.getElementById(7);
	// var letter8 = document.getElementById(8);
	// var letter9 = document.getElementById(9);
	// var letter10 = document.getElementById(10);

	

// if(theWord.length === 3){
// 	console.log("Word Length: " + theWord.length);
// 	fourLetters.innerHTML = "<div class=\"col-xs-1 1\">-</div><div class=\"col-xs-1 2\">-</div><div class=\"col-xs-1 3\">-</div>";
// }else if(theWord.length === 4){
// 	console.log("Word Length: " + theWord.length);
// 	fourLetters.innerHTML = "<div class=\"col-xs-1 1\">-</div><div class=\"col-xs-1 2\">-</div><div class=\"col-xs-1 3\">-</div><div class=\"col-xs-1 4\">-</div>";
// }else if(theWord.length === 5){
// 	console.log("Word Length: " + theWord.length);
// 	fourLetters.innerHTML = "<div class=\"col-xs-1 1\">-</div><div class=\"col-xs-1 2\">-</div><div class=\"col-xs-1 3\">-</div><div class=\"col-xs-1 4\">-</div><div class=\"col-xs-1 5\">-</div>";
// }else if(theWord.length === 6){
// 	console.log("Word Length: " + theWord.length);
// 	fourLetters.innerHTML = "<div class=\"col-xs-1 1\">-</div><div class=\"col-xs-1 2\">-</div><div class=\"col-xs-1 3\">-</div><div class=\"col-xs-1 4\">-</div><div class=\"col-xs-1 5\">-</div><div class=\"col-xs-1 6\">-</div>";
// }else if(theWord.length === 7){
// 	console.log("Word Length: " + theWord.length);
// 	fourLetters.innerHTML = "<div class=\"col-xs-1 1\">-</div><div class=\"col-xs-1 2\">-</div><div class=\"col-xs-1 3\">-</div><div class=\"col-xs-1 4\">-</div><div class=\"col-xs-1 5\">-</div><div class=\"col-xs-1 6\">-</div><div class=\"col-xs-1 7\">-</div>";
// }else if(theWord.length === 9){
// 	console.log("Word Length: " + theWord.length);
// 	fourLetters.innerHTML = "<div class=\"col-xs-1 1\">-</div><div class=\"col-xs-1 2\">-</div><div class=\"col-xs-1 3\">-</div><div class=\"col-xs-1 4\">-</div><div class=\"col-xs-1 5\">-</div><div class=\"col-xs-1 6\">-</div><div class=\"col-xs-1 7\">-</div><div class=\"col-xs-1 8\">-</div><div class=\"col-xs-1 9\">-</div>";
// }else if(theWord.length === 10){
// 	console.log("Word Length: " + theWord.length);
// 	fourLetters.innerHTML = "<div class=\"col-xs-1 1\">-</div><div class=\"col-xs-1 2\">-</div><div class=\"col-xs-1 3\">-</div><div class=\"col-xs-1 4\">-</div><div class=\"col-xs-1 5\">-</div><div class=\"col-xs-1 6\">-</div><div class=\"col-xs-1 7\">-</div><div class=\"col-xs-1 8\">-</div><div class=\"col-xs-1 9\">-</div><div class=\"col-xs-1 10\">-</div>";
// }

// This was trying to append div class so that I didn't have to have the above code.
// console.log("Word Length Test before For: " + theWord.length);
// for(var i = 0; i < theWord.length; i++){
// 	var theDivSet = "<div class=\"col-xs-1 " + i + "\">-</div>"
// 	fourLetters.appendChild("Hello"); 
// }