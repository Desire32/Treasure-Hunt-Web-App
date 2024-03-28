const elements = {
	SeenQuestion: document.getElementById('questionField'),
	treasureHuntsListElement: document.getElementById('treasureHunts'),
	playerNameInput: document.getElementById('playerName'),
	nameButton: document.getElementById('nameButton'),
	userInput: document.querySelector('.userInput'),
	scoreElement: document.getElementById('score'),
  QrCodeElement: document.getElementById('CameraButton')
}

fetchTreasureHunts()

function fetchTreasureHunts() {
	let sessionID = getCookie('sessionID')

	if (!sessionID) {
		fetch('https://codecyprus.org/th/api/list')
			.then(response => response.json())
			.then(jsonObject => {
				let html = ''
				let treasureHunts = {}
				jsonObject.treasureHunts.forEach(treasureHunt => {
					html += `<li class="treasureHuntFontSize" data-uuid="${treasureHunt.uuid}">${treasureHunt.name}</li>`
					treasureHunts[treasureHunt.uuid] = treasureHunt
				})
				elements.treasureHuntsListElement.innerHTML = html
				elements.treasureHuntsListElement.addEventListener(
					'click',
					async function (event) {
						let clickedElement = event.target
						let uuid = clickedElement.getAttribute('data-uuid')
						if (treasureHunts[uuid].shuffled) {
							setCookie('uuid', uuid, 30)
							if (uuid) {
								elements.userInput.style.display = 'block'
								elements.treasureHuntsListElement.style.display = 'none'
								sessionID = await start()
								setCookie('sessionID', sessionID, 30)
							}
						} else {
							alert('This treasure hunt is unavailable')
						}
					}
				)
			})
	} else {
		getQuestion(sessionID)
		loadScore(sessionID)
		elements.scoreElement.style.display = 'block'
	}
}

async function start() {
	let uuid = getCookie('uuid')
	let playerName = elements.playerNameInput.value.trim()

	if (playerName !== '') {
		try {
			if (
				playerName === '' ||
				/^\d+$/.test(playerName) ||
				playerName.length > 50
			) {
				if (/^\d+$/.test(playerName)) {
					alert('Name cannot consist only of numbers.')
				} else if (playerName.length > 50) {
					alert('Name should not exceed 50 characters.')
				} else {
					alert('Please enter a valid name.')
				}
				return false
			}
			elements.playerNameInput.value = ''
		} catch (error) {
			console.error('Reading error')
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
		if (jsonObject.status === 'ERROR') {
			if (jsonObject.errorMessages && jsonObject.errorMessages.length > 0) {
				for (let i = 0; i < jsonObject.errorMessages.length; i++) {
					alert(jsonObject.errorMessages[i])
				}
			}
			return false
		} else if (jsonObject.status === 'OK') {
			let sessionID = jsonObject.session
			setCookie('sessionID', sessionID, 30)
			getQuestion(sessionID)
			return sessionID
		} else {
			return false
		}
	}
}

elements.nameButton.addEventListener('click', async function () {
	let sessionID = await start()
	if (sessionID) {
		loadScore(sessionID)
		elements.scoreElement.style.display = 'block'
	}
})

async function loadScore(sessionID) {
	let scoreURL = 'https://codecyprus.org/th/api/score?session=' + sessionID
	let response = await fetch(scoreURL)
	let jsonObject = await response.json()
	console.log(jsonObject)

	if (jsonObject.status === 'ERROR') {
		if (jsonObject.errorMessages && jsonObject.errorMessages.length > 0) {
			for (let i = 0; i < jsonObject.errorMessages.length; i++) {
				alert(jsonObject.errorMessages[i])
			}
		}
		return false
	}

	elements.scoreElement.textContent = `Score: ${jsonObject.score}`
}


//