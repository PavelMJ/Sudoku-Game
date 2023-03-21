
// inputin user name and password. geting in to game after validation

function passwordValid() {  // function for validation of password 
	let username = document.getElementById('usernameInpt').value //  values from user input
	let password = document.getElementById('passwordInpt').value
	let raw1 = localStorage.getItem('username')  // taking all passwords and user names from lokalStorage
	let raw2 = localStorage.getItem("password")
	userNameStorage = JSON.parse(raw1)// parsing into new array
	passwordStorage = JSON.parse(raw2)
	userNameStorage.push(defaultUser)// add deoult password and username in to same array
	passwordStorage.push(defaultPassword)

	// condition for checking up password and user name inputed by user . if the data matches to data in array
	if (userNameStorage.indexOf(username) != -1 && passwordStorage.indexOf(password) != -1 && userNameStorage.indexOf(username) == passwordStorage.indexOf(password)) {
		signIn.style.display = "none" // sign in element disappears
		document.querySelector('.levels').style.display = 'flex'// element of level choice appears
		document.querySelector('.hale').innerHTML += username
		document.querySelector(".musicToggle").style.display = "block" //  stop music plaing icon
		musicSwitsch() // music play function. music start plaing
	}
	if (userNameStorage.indexOf(username) == -1) { // messege in case of user name incorrect
		document.getElementById('usernameErr').innerHTML = '*' + " this username does't exist";
	}

	if (passwordStorage.indexOf(password) == -1) { // massage in case of password incorrect
		document.getElementById('passwordErr').innerHTML = "*" + "this password incorrect";
	}
}

//Get in option by pressing Enter key

let usernameInpt = document.getElementById('usernameInpt')
let passwordInpt = document.getElementById('passwordInpt')

let signIn = document.getElementById('signIn')// reseavin sign in element for event listener
document.addEventListener('keyup', (event) => {
	if (event.key == "Enter" && usernameInpt.value != '' && passwordInpt.value != '') {
		passwordValid()
	}
})


// creating all 81 cells  of suduku. they will be orderd in rows 9 cells in every row
let rows = document.querySelectorAll(".rows") // variable of row div
let counter = 0 // couner to give every cell uniq number
let click2 = new Audio('./sound/click sound 1.wav')  // sound of button click

// producing cells by loop
for (let i = 0; i < rows.length; i++) { 
	for (let j = 0; j < 9; j++) {
		counter++
		let cell = document.createElement('div')
		cell.classList.add("cell", counter.toString())
		rows[i].appendChild(cell)
	}
}

let numButtons = document.querySelectorAll(".button") // array that contain all numer buttons
let playArray = flatMat(exec(basedSudocu)) // this is main play array. it's prodused by group of function that making 
//randomisation of sudoku in gen_script.js file. the exec function calls all randomicati
let reset = [] // in this array we'll copy playArray for reseting game

let cells = document.querySelectorAll(".cell") // this variable is array of all cells of grid


// calculation quantity of numbers that will be deleted depending on selected level
let lvlEasy = Math.ceil(81 * 0.25) // 20
let lvlHard = Math.ceil(81 * 0.5) // 40
let lvlVeryHard = Math.ceil(81 * 0.75) //60

// function that filling the grid with numbers if player chooses easy level
function easy() {
	makeTemplate(lvlEasy)// all this pocces made by function wrighten below
	fillGrid()
	startGame()
	reset = playArray.map((x) => x)
}

// function that filling the grid with numbers if player chooses hard level

function hard() {
	makeTemplate(lvlHard)// all this pocces made by function wrighten below
	fillGrid()
	startGame()
	reset = playArray.map((x) => x)

}
// function that filling the grid with numbers if player chooses very hard level

function veryHard() {
	makeTemplate(lvlVeryHard)// all this pocces made by function wrighten below
	fillGrid()
	startGame()
	reset = playArray.map((x) => x) // copy of playArray to reset array
}


// if player click on one og cells. the cell will be marked with red border(outline)
for (let i = 0; i < cells.length; i++) {
	cells[i].onclick = function () {
		for (let j = 0; j < cells.length; j++) {
			if (j != i) {
				cells[j].classList.remove("cell-border")
			}
		}
		this.classList.add("cell-border")
	}
}

// lose and win banners will appiers by clicking Finish button depending on result of game

let loseBaner = document.querySelector('.loseBaner')
let winBaner = document.querySelector(".winBaner")
let timeRes = document.querySelector('.time-res')// player will see how much time he spent for curent game

let clicButton = new Audio("./sound/click sound 4.wav") 
let music = new Audio("./sound/Japan Chillwave.mp3") // background music variable
let musicToggle = false // by this variable we know if music plaing or not


// with this loop player wrigting the numbers to cells. we can wright only cells marked by red border
for (let b = 0; b < numButtons.length; b++) {
	numButtons[b].onclick = function () {
		clicButton.play()
		for (let i = 0; i < cells.length; i++) {
			if (cells[i].classList[2] == "cell-border") {
				cells[i].innerHTML = this.value
				playArray[i] = this.value

			}
		}
	}
}

// this function deliting random numbers from playArray. The quantity depends on chosen level
function makeTemplate(level) {
	let ran
	for (let i = 0; i < level; i++) {
		ran = Math.floor(Math.random() * 80)
		if (playArray[ran] != 0) {
			playArray[ran] = 0
		}
		else {
			playArray[Math.floor(Math.random() * 80)] = 0
		}
	}
	return playArray
}

// this function fills the grid with numpers from playArray
function fillGrid() {
	for (let i = 0; i < playArray.length; i++) {
		if (playArray[i] != 0) {
			cells[i].innerHTML = playArray[i]
			cells[i].style.backgroundColor = "#ebf8e1"
		}
	}
}



// this function restarting curent game. it can be called in 2 cases
// in game it selfs and after finish of a game
function reSet() {
	click2.play()
	loseBaner.style.display = "none"
	winBaner.style.display = 'none'
	document.querySelector('.sudoku').style.filter = "blur(0)"
	document.querySelector('.sudoku').style.opacity = "100%"
	document.querySelector('.block').style.display = "none"

	let cells = document.querySelectorAll(".cell")
	for (let i = 0; i < playArray.length; i++) {
		if (reset[i] === 0) {
			cells[i].innerHTML = ''
		}
		else {
			playArray[i] = reset[i]
			cells[i].innerHTML = reset[i]
		}
	}
}

// this functinon clears the game grid for gerating new game it calls in newGame function
function clearGrid() {
	for (let i = 0; i < cells.length; i++) {
		cells[i].innerHTML = ''
		cells[i].style.backgroundColor = "#b9bbb8"

	}
}

// this function making disapier level choosing element and turnin on all game elements
function startGame() {
	document.querySelector('.levels').style.display = "none";
	document.querySelector('.sudoku').style.display = "grid";
	startTime() // play timer
	
}

// timer variabls
let clock = document.querySelector('.clock'); 
let seconds = 0;
let interval = null; 

//timer functions
function time(){
	seconds++
	let sec = seconds % 60
	let min = Math.floor(seconds / 60)
	if(sec < 10) sec = "0" + sec
	if(min < 10) min = "0"+ min
	clock.innerHTML = `${min}:${sec}`
}

function startTime(){ //timer starts with game
	if(interval){return}
	interval = setInterval(time, 1000)
}

function stopTime(){ // timer stops after cliking on Finish button
	clearInterval(interval)
	interval = null
}

function resetTime(){
	seconds = 0
}


// this function calls after clicking on Finish button. This function contains group of function tha we call from ./finalCheck.js file
function checkResult() {
	let chk1 = squerCheckUp(playArray, exmat) 
	let chk2 = columnCheckUp(playArray)
	let chk3 = rowCheckUp(playArray)
	stopTime()

	if (chk1 == true && chk2 == true && chk3 == true) { // conditions whene player have won
		
		document.querySelector('.sudoku').style.opacity = "25%"
		document.querySelector('.sudoku').style.filter = "blur(8px)"
		document.querySelector('.block').style.display = "block"
		document.querySelector(".winTime").innerHTML += clock.innerHTML
		loseBaner.style.display = "none"
		winBaner.style.display = 'block'

	}
	else { //conditions when player have lose 
		
		document.querySelector('.sudoku').style.opacity = "25%"
		document.querySelector('.sudoku').style.filter = "blur(8px)"
		document.querySelector('.block').style.display = "block"
		loseBaner.style.display = "block"
		winBaner.style.display = 'none'
	}
}

//

// function for launchng new game. it's cleaning game grid, generate new Play array and moving in to Level choice block  
function newGame() {
	loseBaner.style.display = "none"
	winBaner.style.display = 'none'
	document.querySelector('.sudoku').style.opacity = "100%"
	document.querySelector('.levels').style.display = "flex";
	document.querySelector('.sudoku').style.display = "none";
	document.querySelector('.block').style.display = "none"

	clearGrid()
	click2.play()
	playArray = flatMat(exec(basedSudocu))
	// chekArray = playArray.map((x) => x)
	reset = []
	stopTime()
	resetTime()

}

// the function for starting and stoping music playing in diferent cases

function musicSwitsch() {
	let volume = document.querySelector('.volume')
	let mute = document.querySelector('.mute')

	if (musicToggle == true) {
		musicToggle = false
		mute.style.display = "block"
		volume.style.display = 'none'
		music.pause()
	}

	else if (musicToggle == false) {
		mute.style.display = "none"
		volume.style.display = 'block'
		music.play()
		musicToggle = true
	}
}

// function for resume button. Geve ability to resume to same game for mistakes fixing
function resume() {
	loseBaner.style.display = "none"
	winBaner.style.display = 'none'
	document.querySelector('.sudoku').style.opacity = "100%"
	document.querySelector('.sudoku').style.filter = "blur(0)"
	document.querySelector('.block').style.display = "none"

	startTime()
}

// event listener for keyboard controls of game. With arrows plaer can move cell marker and input digits 
//from keyboard in marked cell.

document.addEventListener("keyup", function (event) {
	for (let i = 0; i < cells.length; i++) {
		if (cells[i].classList[2] == 'cell-border' && event.key >= "0" && event.key <= '9') {
			cells[i].innerHTML = event.key
			playArray[i] = event.key
			break
		}
		if (i < 80 && cells[i].classList[2] == 'cell-border' && event.key == "ArrowRight") {
			cells[i].classList.remove("cell-border")
			cells[i + 1].classList.add("cell-border")
			break

		}
		if (i > 0 && cells[i].classList[2] == 'cell-border' && event.key == "ArrowLeft") {
			cells[i].classList.remove("cell-border")
			cells[i - 1].classList.add("cell-border")
			break
		}
		if (i > 8 && cells[i].classList[2] == 'cell-border' && event.key == "ArrowUp") {
			cells[i].classList.remove("cell-border");
			cells[i - 9].classList.add("cell-border");
			break
		}
		if (i < 72 && cells[i].classList[2] == 'cell-border' && event.key == "ArrowDown") {
			cells[i].classList.remove("cell-border")
			cells[i + 9].classList.add("cell-border")
			break
		}
	}
})




