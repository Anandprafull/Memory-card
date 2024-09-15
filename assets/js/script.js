//Wait for the DOM to finish loading before running game 
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', InstructionsModal());
}

const tiles = document.querySelectorAll('.game-tile');
let lockBoard = true;
let hasTurnedTileOver = false;
let firstTile, secondTile;
let score = 0;

//start up screen instructions
function InstructionsModal(){
	$("#game-instructions").modal('show');
}

//Unlocks board, initiates countdown timer and allows player to start making tile matches.
function startGame() {
	$("#game-instructions").modal('hide');
	countdownTimer();
	lockBoard = false;
	score = 0;
}

// Game Countdown timer
//Assistance with this code from here: https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown 
function countdownTimer() {
	var timeleft = 49;
	var countdownTimer = setInterval(function () {
		if (score === 8) {
			removeRubbish();
			congratulationsModal();
		} else if (timeleft <= 0) { //Timer run out - game over message
			clearInterval(countdownTimer);
			document.getElementById("countdown").innerHTML = "GAME OVER";
			lockBoard = true;
			gameoverModal();
		} else { // timer continues until zero
			document.getElementById("countdown").innerHTML = timeleft;
		}
		timeleft -= 1;
	}, 1000);
}

//Allow tiles to be turned over in game play 
function turnTileOver() {
	if (lockBoard) return;
	this.classList.add('turnTileOver');

	if (!hasTurnedTileOver) {
		//first click
		hasTurnedTileOver = true;
		firstTile = this;
	} else {
		//second click
		hasTurnedTileOver = false;
		secondTile = this;

		checkForMatch();
	}
}

//Check that tiles are a match
function checkForMatch() {
	if (firstTile.dataset.image === secondTile.dataset.image) {
		//if tiles are a match
		disableTiles();
		incrementScore();
	} else {
		//if tiles are NOT a match
		unturnTiles();
	}
}

//if tiles are a match
function disableTiles() {
	firstTile.removeEventListener('click', turnTileOver);
	secondTile.removeEventListener('click', turnTileOver);
}

//if tiles are NOT a match
function unturnTiles() {
	lockBoard = true;

	setTimeout(() => {
		firstTile.classList.remove('turnTileOver');
		secondTile.classList.remove('turnTileOver');
		lockBoard = false;
	}, 600);
}

//Add to the score if tiles match
function incrementScore() {
	score++;
	document.getElementById("match-count").innerText = score;
}

//congratulations when all tiles match. Show modal and time left.
function congratulationsModal(){
	$("#game-winner").modal('show');
	
	//showing total time 
	finalTime = document.getElementById("countdown").innerText;
	document.getElementById("remainingTime").innerHTML = finalTime;
}

function removeRubbish() {
	$("#dirty-area").addClass("hide");
}

//game over when the countdowntime runs out. Show modal and time left.
function gameoverModal(){
	$("#game-over").modal('show');
	
	//showing total time 
	finalTime = document.getElementById("countdown").innerText;
	document.getElementById("remainingTime").innerHTML = finalTime;
}

// Assistance from https://marina-ferreira.github.io/tutorials/js/memory-game/ 
(function shuffle() {
	tiles.forEach(tile => {
		let randomPos = Math.floor(Math.random() * 16);
		tile.style.order = randomPos;
	});
})();

tiles.forEach(tiles => {
	tiles.addEventListener('click', turnTileOver);
});

//Welcome page
//Allowing player to customise the game and add their name.
function checkPlayer() {
	var obj = document.getElementById("player-name-entry");
	
	//if player name is left empty alert the user to enter their name and don't continue
	if (obj.value == "") {
		alert("Oops! To play the game, please introduce yourself and enter your name.");
	} else {
		hidePlayernamebox();
	}
}

//Get the players name from the text box and insert the value into the element.
function playerName() {
	var obj = document.getElementById("player-name-entry");
	var str = "Hello " + obj.value + ",";
	var obj2 = document.getElementById("player-name");
	obj2.innerHTML = str;
}

//Removing name box and button when player name added.
function hidePlayernamebox() {
	playerName();
	var getName = $("#player-name-entry-button");
	getName.hide();
	$("#player-name-entry").hide();
	$("#introduction").hide();
	$("#p-introduction").hide();
	$("#welcome-message").show();
}

//pop bubbles individually
$("#bubble1").mouseover(popBubble1);
$("#bubble2").mouseover(popBubble2);
$("#bubble3").mouseover(popBubble3);
$("#bubble4").mouseover(popBubble4);
$("#bubble5").mouseover(popBubble5);
$("#bubble6").mouseover(popBubble6);

function popBubble1() {
	$("#bubble1").addClass("hide");
}

function popBubble2() {
	$("#bubble2").addClass("hide");
}

function popBubble3() {
	$("#bubble3").addClass("hide");
}

function popBubble4() {
	$("#bubble4").addClass("hide");
}

function popBubble5() {
	$("#bubble5").addClass("hide");
}

function popBubble6() {
	$("#bubble6").addClass("hide");
}