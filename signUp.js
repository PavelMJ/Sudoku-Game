let defaultUser = "abcd"
let defaultPassword ="1234"


let userNameStorage = []
let passwordStorage = []

if (localStorage.length == 0) {
	localStorage.setItem("username", JSON.stringify(userNameStorage))
	localStorage.setItem("password", JSON.stringify(passwordStorage))
}

function signUpFn() {
	let username = document.getElementById('username').value
	let password = document.getElementById('password').value
	let confPassword = document.getElementById('confirmPassword').value

	if (password === confPassword) {
		userNameStorage.push(username);
		passwordStorage.push(password);

		let raw1 = localStorage.getItem('username')
		let raw2 = localStorage.getItem('password')

		username = JSON.parse(raw1);
		password = JSON.parse(raw2);

		username.push(userNameStorage[0])
		password.push(passwordStorage[0])

		localStorage.setItem('username', JSON.stringify(username))
		localStorage.setItem('password', JSON.stringify(password))

		window.location.href = "index.html"
	}
	else {
		document.getElementById(notMatch).style.display = "block"
	}

}