const elements = {
	SeenQuestion: document.getElementById('questionField'),
	treasureHuntsListElement: document.getElementById('treasureHunts'),
	playerNameInput: document.getElementById('playerName'),
	nameButton: document.getElementById('nameButton'),
	appName: document.getElementById('appName'),
	userInput: document.querySelector('.userInput'),
}

fetchTreasureHunts()

function fetchTreasureHunts() {
	fetch('https://codecyprus.org/th/api/list')
		.then(response => response.json())
		.then(jsonObject => {
			let html = ''
			jsonObject.treasureHunts.forEach(treasureHunt => {
				html += `<li class="treasureHuntFontSize" data-uuid="${treasureHunt.uuid}">${treasureHunt.name}</li>`
			})
			elements.treasureHuntsListElement.innerHTML = html
			elements.treasureHuntsListElement.addEventListener(
				'click',
				async function (event) {
					let clickedElement = event.target
					let uuid = clickedElement.getAttribute('data-uuid')
					setCookie('uuid', uuid, 30)
					if (uuid) {
						elements.userInput.style.display = 'block'
						elements.treasureHuntsListElement.style.display = 'none'
						await start()
					}
				}
			)
		})
}

async function start() {
	let uuid = getCookie('uuid')
	let playerName = elements.playerNameInput.value.trim()
	if (
		playerName !== '' &&
		!/^\d+$/.test(playerName) &&
		playerName.length <= 50
	) {
		let storedWords = JSON.parse(getCookie('storedWords')) || []
		if (storedWords.includes(playerName)) {
			alert(
				'This name has already been used before. Please enter a different name.'
			)
			return false
		}

		let url =
			'https://codecyprus.org/th/api/start' +
			'?player=' +
			playerName +
			'&app=ComputerLegendsApp' +
			'&treasure-hunt-id=' +
			uuid

		let response = await fetch(url)
		let jsonObject = await response.json()
		console.log(jsonObject)
		let sessionID = jsonObject.session
		setCookie('sessionID', sessionID, 30)
		addWordToStorage()
		getQuestion(sessionID)
		return sessionID
	} else {
		if (/^\d+$/.test(playerName)) {
			alert('Name cannot consist only of numbers.')
		} else if (playerName.length > 50) {
			alert('Name should not exceed 50 characters.')
		} else {
			alert('Please enter a valid name.')
		}
		return false
	}
}

elements.nameButton.addEventListener('click', async function () {
	let sessionID = await start()
	if (sessionID) {
		loadScore(sessionID)
		document.getElementById('score').style.display = 'block'
	}
})

start().then(sessionID => {
	getQuestion(sessionID)
})

function addWordToStorage() {
	let word = elements.playerNameInput.value.trim()
	if (word !== '') {
		try {
			let storedWords = JSON.parse(getCookie('storedWords')) || []
			if (storedWords.includes(word)) {
				alert('Such name has already been used before, try again')
				return
			}
			storedWords.push(word)
			setCookie('storedWords', JSON.stringify(storedWords), 30)
			elements.playerNameInput.value = ''
		} catch (error) {
			console.error('Reading error')
		}
	}
}

async function loadScore(sessionID) {
	let scoreURL = 'https://codecyprus.org/th/api/score?session=' + sessionID
	let scoreElement = document.getElementById('score')

	try {
		let response = await fetch(scoreURL)
		let jsonObject = await response.json()
		console.log(jsonObject)
		scoreElement.textContent = `Score: ${jsonObject.score}`
	} catch (error) {
		console.error('Error fetching score:', error)
	}
}

