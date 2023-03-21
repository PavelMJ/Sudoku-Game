
// zone testing matrix every array in matrix its 3x3 zone of play array 
let exmat = [
	[0, 1, 2, 9, 10, 11, 18, 19, 20],
	[3, 4, 5, 12, 13, 14, 21, 22, 23],
	[6, 7, 8, 15, 16, 17, 24, 25, 26],
	[27, 28, 29, 36, 37, 38, 45, 46, 47],
	[30, 31, 32, 39, 40, 41, 48, 49, 50],
	[33, 34, 35, 42, 43, 44, 51, 52, 53],
	[54, 55, 56, 63, 64, 65, 72, 73, 74],
	[57, 58, 59, 66, 67, 68, 75, 76, 77],
	[60, 61, 62, 69, 70, 71, 78, 79, 80]
]

// function of zone testing with testig matrix 
function squerCheckUp(array, matrx) {
	let tempArr = []
	let checkArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	for (let i = 0; i < matrx.length; i++) {
		for (let j = 0; j < matrx[i].length; j++) {
			tempArr[j] = array[matrx[i][j]];
		}
		for (let j = 0; j < tempArr.length; j++) {
			checkArr[tempArr[j]] += 1
			if (checkArr[tempArr[j]] > 1) {
				return false
			}
		}
		checkArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	}
	return true
}

//function of column testing

function columnCheckUp(arr) {
	let temp = []
	let checkArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	
	for (let i = 0; i < 9; i++) { // we adding everi 9 element in array in to new array every loop moving one number forward
		let k = i
		for (let j = 0; j < arr.length; j++) {
			temp[j]=arr[k]
			k += 9
		}
		for (let j = 0; j < 9; j++) { // than checkin up that all elements in array are unique
			checkArr[temp[j]] += 1
			if (checkArr[temp[j]] > 1) {
				return false
			}
		}
		checkArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 
	}
	return true
}

// functin testig all rows in array
function rowCheckUp(arr){

	let temp = []
	let checkArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

	for (let i = 0; i < arr.length; ) { // every loop we testig only 9 numbers in array 
		//  and then next 9 numbers in next loop
		let k = 0
		for (let j = i; j < (i+9); j++) {
			temp[k] = arr[j]
			k++
		}
		for (let j = 0; j < 9; j++) {
			checkArr[temp[j]] += 1
			if (checkArr[temp[j]] > 1) {
				return false
			}
		}
		i+=9
		checkArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	}
	return true
}

// console.log(rowCheckUp(sudokuArr));
