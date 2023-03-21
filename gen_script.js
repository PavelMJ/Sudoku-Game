// this is the basic sudoku matrix array. most simple variation of sudoku for mixing that and generating random sudoku array
let basedSudocu =
	[[1, 2, 3, 4, 5, 6, 7, 8, 9],
	[4, 5, 6, 7, 8, 9, 1, 2, 3],
	[7, 8, 9, 1, 2, 3, 4, 5, 6],
	[2, 3, 4, 5, 6, 7, 8, 9, 1],
	[5, 6, 7, 8, 9, 1, 2, 3, 4],
	[8, 9, 1, 2, 3, 4, 5, 6, 7],
	[3, 4, 5, 6, 7, 8, 9, 1, 2],
	[6, 7, 8, 9, 1, 2, 3, 4, 5],
	[9, 1, 2, 3, 4, 5, 6, 7, 8],
	]



// vertical mixing function to mix vertical rows of basic array
// we can mix vertical rows in to zones of every 3 numbers
function verticalMix(mat) {
	let x
	let y
	// every call of function it's one change between 2 rows in random way
	switch (Math.ceil(Math.random() * 9)) {
		case 1:
			x = 0
			y = 1
			break;
		case 2:
			x = 1
			y = 2
			break;
		case 3:
			x = 0
			y = 2
			break;
		case 4:
			x = 3
			y = 4
			break;
		case 5:
			x = 4
			y = 5
			break;
		case 6:
			x = 3
			y = 5
			break;
		case 7:
			x = 6
			y = 7
			break;
		case 8:
			x = 7
			y = 8
			break;
		case 9:
			x = 6
			y = 8
			break;
	}

	for (i in mat) {
		let temp = 0
		temp = mat[i][x]
		mat[i][x] = mat[i][y]
		mat[i][y] = temp
	}
	return mat
}

// horizontal mix of columns in basic array. The same way like vertical mix
function horizontalMix(mat) {
	let x
	let y
	switch (Math.ceil(Math.random() * 9)) {
		case 1:
			x = 0
			y = 1
			break;
		case 2:
			x = 1
			y = 2
			break;
		case 3:
			x = 0
			y = 2
			break;
		case 4:
			x = 3
			y = 4
			break;
		case 5:
			x = 4
			y = 5
			break;
		case 6:
			x = 3
			y = 5
			break;
		case 7:
			x = 6
			y = 7
			break;
		case 8:
			x = 7
			y = 8
			break;
		case 9:
			x = 6
			y = 8
			break;
	}


	let temp = 0
	temp = mat[x]
	mat[x] = mat[y]
	mat[y] = temp
	return mat
}

// function that turning matrix all rows turning in to columns
function turnMatx(mat) {

	let turnd = []
	for (let i = 8; i > -1; i--) {
		let arr = []
		for (let j = 8; j > -1; j--) {
			arr.push(mat[i][j])
		}
		turnd.push(arr)
	}
	mat = turnd
	return mat
}

// function icrieses all digit of matrix in same number
function incresMat(mat) {
	let rand = (Math.ceil(Math.random() * 9))
	let sum = 0;
	for (let i = 0; i < mat.length; i++) {
		for (let j = 0; j < mat[i].length; j++) {
			sum = mat[i][j] + rand;
			if (sum > 9) {
				mat[i][j] = sum - 9
			}
			else {
				mat[i][j] = sum
			}
		}
	}
	return mat
}


// the function that exicute mixing with all function random number of times
function exec(mat) {
	// debugger
	let cerc = Math.floor(Math.random() * 2000)
	for (let i = 0; i < cerc; i++) {
		mat = incresMat(mat)
		mat = verticalMix(mat);
		mat = turnMatx(mat)
		mat = horizontalMix(mat)
	}

	return mat
}

// function that turning matrix to flat array for working in script.js

function flatMat(mat) {
	let flat = []
	for (let i in mat) {
		for (let j in mat[i]) {
			flat.push(mat[i][j])
		}
	}
	return flat
}




