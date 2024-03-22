let testNameElement = document.getElementById('testInfo')
let playerNameInput = document.getElementById('playerName')
let nameButton = document.getElementById('nameButton')
let uuid = localStorage.getItem('uuid')


function start() {
	let playerName = playerNameInput.value.trim()
	if (playerName !== '') {
		let url =
			'https://codecyprus.org/th/api/start' +
			'?player=' +
			playerName +
			'&app=ComputerLegendsApp' +
			'&treasure-hunt-id=' +
			uuid

		fetch(url)
			.then(response => response.json())
			.then(jsonObject => {
				console.log(jsonObject)
				if (jsonObject.status === 'OK') {
					let session = jsonObject.session
					localStorage.setItem('sessionID', session)
					let numOfQuestions = jsonObject.numOfQuestions
					localStorage.setItem('numOfQuestions', numOfQuestions)
				}
			})
		addWordToStorage()
	} else {
		alert('Please enter your name')
	}
}

function addWordToStorage() {
	let word = playerNameInput.value.trim()
	if (word !== '') {
		try {
			let storedWords = JSON.parse(localStorage.getItem('storedWords')) || []
			if (storedWords.includes(word)) {
				alert('Such name has already been used before, try again')
				return
			}
			storedWords.push(word)
			localStorage.setItem('storedWords', JSON.stringify(storedWords))
			playerNameInput.value = ''

			let lastWordArray = storedWords[storedWords.length - 1]
			testElements.innerHTML += `<li>Name: ${lastWordArray}</li>`
		} catch (error) {
			console.error('Reading error')
		}
	}
}
